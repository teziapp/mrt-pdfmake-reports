import { useCallback, useRef } from 'react';
import type { 
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  MRT_PaginationState,
  MRT_RowData,
} from 'material-react-table';
import type { FetchDataOptions, FetchDataResult } from '../types/data';

interface UseTableDataProps<TData extends MRT_RowData> {
  fetchData: (options: FetchDataOptions) => Promise<FetchDataResult>;
  columns: MRT_ColumnDef<TData>[];
  enablePaginatedDataFetch: boolean;
  rowCount: number;
  pagination: MRT_PaginationState;
  sorting: MRT_SortingState;
  globalFilter: string;
  columnFilters: MRT_ColumnFiltersState;
  setIsLoading: (isLoading: boolean) => void;
  setData: (data: TData[]) => void;
  setPageCount: (count: number) => void;
}

export const useTableData = <TData extends MRT_RowData>({
  fetchData,
  columns,
  enablePaginatedDataFetch,
  rowCount,
  pagination,
  sorting,
  globalFilter,
  columnFilters,
  setIsLoading,
  setData,
  setPageCount,
}: UseTableDataProps<TData>) => {
  // Use a ref to track the previous fetch parameters to prevent duplicate fetches
  const lastFetchParamsRef = useRef<string>('');

  const loadData = useCallback(async () => {
    const fetchParams = JSON.stringify({
      pagination,
      sorting,
      globalFilter,
      columnFilters,
      enablePaginatedDataFetch,
      rowCount
    });

    // Skip if the parameters haven't changed
    if (fetchParams === lastFetchParamsRef.current) {
      console.log('Skipping duplicate fetch with same parameters');
      return;
    }

    setIsLoading(true);
    lastFetchParamsRef.current = fetchParams;

    try {
      const filters = [...columnFilters];
      if (globalFilter) {
        // Add global filter to each column
        columns.forEach(column => {
          if (column.accessorKey) {
            filters.push({
              id: column.accessorKey as string,
              value: globalFilter,
            });
          }
        });
      }

      const result = await fetchData({
        enablePaginatedDataFetch,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        rowCount,
        sorting: sorting.map(sort => ({ id: sort.id, desc: sort.desc })),
        filters: filters.map(filter => ({ id: filter.id, value: String(filter.value) })),
      });

      setData(result.data as unknown as TData[]);
      setPageCount(enablePaginatedDataFetch ? result.pageCount : Math.ceil(rowCount / pagination.pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [
    fetchData,
    columns,
    pagination,
    sorting,
    globalFilter,
    columnFilters,
    enablePaginatedDataFetch,
    rowCount,
    setIsLoading,
    setData,
    setPageCount,
  ]);

  return { loadData };
}; 