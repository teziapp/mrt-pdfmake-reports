import { useState, useCallback, useEffect } from 'react';
import type { 
  MRT_ColumnFiltersState, 
  MRT_SortingState,
  MRT_PaginationState,
} from 'material-react-table';

interface UseTableStateProps {
  initialPageSize: number;
  enableStatePersistence?: boolean;
  stateStorageKey?: string;
}

export const useTableState = ({
  initialPageSize,
  enableStatePersistence = false,
  stateStorageKey = 'smartTable',
}: UseTableStateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<MRT_PaginationState>({ 
    pageIndex: 0, 
    pageSize: initialPageSize 
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [pageCount, setPageCount] = useState(0);

  // Load persisted state if enabled
  useEffect(() => {
    if (enableStatePersistence) {
      const savedState = localStorage.getItem(stateStorageKey);
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          setPagination(parsedState.pagination || pagination);
          setSorting(parsedState.sorting || sorting);
          setGlobalFilter(parsedState.globalFilter || '');
          setColumnFilters(parsedState.columnFilters || []);
        } catch (error) {
          console.error('Error loading persisted state:', error);
        }
      }
    }
  }, [enableStatePersistence, stateStorageKey]);

  // Save state when it changes
  useEffect(() => {
    if (enableStatePersistence) {
      const stateToSave = {
        pagination,
        sorting,
        globalFilter,
        columnFilters,
      };
      localStorage.setItem(stateStorageKey, JSON.stringify(stateToSave));
    }
  }, [enableStatePersistence, stateStorageKey, pagination, sorting, globalFilter, columnFilters]);

  return {
    isLoading,
    setIsLoading,
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    pageCount,
    setPageCount,
  };
}; 