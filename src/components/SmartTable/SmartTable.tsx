import { MaterialReactTable, type MRT_ColumnDef, type MRT_TableState, type MRT_ColumnFiltersState, type MRT_SortingState } from 'material-react-table';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import type { FetchDataOptions, FetchDataResult } from '../../data/generateData';
import { Toolbar } from '../Toolbar';
import { usePDFExport } from '@/hooks/usePDFExport';
import { useMockPDFExport } from '@/hooks/useMockPDFExport';
import { SmartTableColumn, PDFExportOptions } from '@/types/table';

export interface SmartTableProps<TData extends Record<string, any> = {}> {
  columns: MRT_ColumnDef<TData>[];
  fetchData: (options: FetchDataOptions) => Promise<FetchDataResult>;
  initialPageSize?: number;
  rowCount?: number;
  enablePaginatedDataFetch?: boolean;
  enableColumnFilters?: boolean;
  enableGrouping?: boolean;
  enableColumnDragging?: boolean;
  enableGlobalFilter?: boolean;
  enablePDFExport?: boolean;
  pdfExportOptions?: PDFExportOptions;
  useMockExport?: boolean;
  onExport?: () => void;
}

export const SmartTable = <TData extends Record<string, any> = {}>({
  columns,
  fetchData,
  initialPageSize = 10,
  rowCount = 10000,
  enablePaginatedDataFetch = true,
  enableColumnFilters = true,
  enableGrouping = true,
  enableColumnDragging = true,
  enableGlobalFilter = true,
  enablePDFExport = true,
  pdfExportOptions,
  useMockExport = false,
  onExport,
}: SmartTableProps<TData>) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ 
    pageIndex: 0, 
    pageSize: initialPageSize 
  });
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<{ id: string; value: string }[]>([]);

  // Use a ref to track the previous fetch parameters to prevent duplicate fetches
  const lastFetchParamsRef = useRef<string>('');

  const tableColumns = useMemo(() => columns, [columns]);

  // Initialize the appropriate PDF export hook based on the mock flag
  const { exportToPDF: realExportToPDF } = usePDFExport<TData>({
    enabled: enablePDFExport && !useMockExport,
    options: pdfExportOptions,
  });

  const { exportToPDF: mockExportToPDF } = useMockPDFExport({
    enabled: enablePDFExport && useMockExport,
    options: pdfExportOptions,
    onExport,
  });

  // Use the appropriate export function
  const exportToPDF = useMockExport ? mockExportToPDF : realExportToPDF;

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
        tableColumns.forEach(column => {
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
        sorting,
        filters,
      });

      setData(result.data as unknown as TData[]);
      setPageCount(enablePaginatedDataFetch ? result.pageCount : Math.ceil(rowCount / pagination.pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, tableColumns, pagination, sorting, globalFilter, columnFilters, enablePaginatedDataFetch, rowCount]);

  // Only fetch data when component mounts or when loadData dependencies change
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSortingChange = useCallback((updater: MRT_SortingState | ((prev: MRT_SortingState) => MRT_SortingState)) => {
    const newSorting = typeof updater === 'function' ? updater([]) : updater;
    setSorting(newSorting.map(sort => ({ id: sort.id, desc: sort.desc })));
  }, []);

  const handleColumnFiltersChange = useCallback((updater: MRT_ColumnFiltersState | ((prev: MRT_ColumnFiltersState) => MRT_ColumnFiltersState)) => {
    const newFilters = typeof updater === 'function' ? updater([]) : updater;
    setColumnFilters(newFilters.map(filter => ({ id: filter.id, value: String(filter.value) })));
  }, []);

  // Handle PDF export
  const handleExportPDF = useCallback(() => {
    console.log('Exporting PDF...', useMockExport ? '(MOCK)' : '(REAL)');
    
    const tableState = {
      sorting,
      columnVisibility: {},
      pagination,
      columnFilters,
      globalFilter,
    };

    // Collect column visibility information
    const columnVisibility: Record<string, boolean> = {};
    columns.forEach((column) => {
      if (column.accessorKey) {
        columnVisibility[column.accessorKey as string] = column.enableHiding !== false;
      }
    });
    tableState.columnVisibility = columnVisibility;

    // Convert MRT columns to SmartTableColumns for PDF export
    const smartTableColumns = columns.map((col) => ({
      ...col,
      // Default to enabling PDF export for all columns unless explicitly disabled
      enablePDFExport: (col as SmartTableColumn<TData>).enablePDFExport !== false,
    })) as SmartTableColumn<TData>[];

    // Use the chosen exporter
    exportToPDF({
      data,
      columns: smartTableColumns,
      state: tableState as any,
    });

    // Call the export callback if provided
    if (onExport && !useMockExport) {
      onExport();
    }
  }, [data, columns, exportToPDF, sorting, pagination, columnFilters, globalFilter, useMockExport, onExport]);

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable
        columns={tableColumns}
        data={data}
        enableColumnFilters={enableColumnFilters}
        enableGrouping={enableGrouping}
        enableColumnDragging={enableColumnDragging}
        enableGlobalFilter={enableGlobalFilter}
        enablePagination={true}
        manualPagination={true}
        manualFiltering
        manualSorting
        enableRowSelection={false}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '0.5rem',
            border: '1px solid',
            borderColor: theme.palette.divider,
          },
        }}
        onPaginationChange={setPagination}
        onSortingChange={handleSortingChange}
        onGlobalFilterChange={setGlobalFilter}
        onColumnFiltersChange={handleColumnFiltersChange}
        rowCount={rowCount}
        pageCount={pageCount}
        state={{
          pagination,
          sorting,
          globalFilter,
          columnFilters,
          isLoading,
        }}
        initialState={{
          pagination: {
            pageSize: initialPageSize,
            pageIndex: 0,
          },
        }}
        // Use Material React Table's built-in toolbar + PDF export button
        enableToolbarInternalActions={true}
        positionToolbarAlertBanner="bottom"
        positionGlobalFilter="left"
        renderTopToolbarCustomActions={() => (
          enablePDFExport && (
            <Tooltip arrow title="Export to PDF">
              <IconButton 
                onClick={handleExportPDF}
                aria-label="Export to PDF"
                data-testid="export-pdf-button"
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          )
        )}
      />
    </Box>
  );
};