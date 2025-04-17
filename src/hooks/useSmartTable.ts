import { useCallback, useEffect, useMemo, useState } from 'react';
import { MRT_TableInstance } from 'material-react-table';
import { SmartTableProps, TableState } from '@/types/table';
import { useLocalStorageSync } from './useLocalStorageSync';
import { useBackendSync } from './useBackendSync';
import { usePDFExport } from './usePDFExport';

export function useSmartTable<TData extends Record<string, any>>({
  data,
  columns,
  enableStatePersistence,
  stateStorageKey,
  enablePDFExport,
  pdfExportOptions,
  enableBackendSync,
  backendSyncOptions,
  enableDebugMode,
}: Pick<
  SmartTableProps<TData>,
  | 'data'
  | 'columns'
  | 'enableStatePersistence'
  | 'stateStorageKey'
  | 'enablePDFExport'
  | 'pdfExportOptions'
  | 'enableBackendSync'
  | 'backendSyncOptions'
  | 'enableDebugMode'
>) {
  // Initialize table state
  const [tableState, setTableState] = useState<TableState<TData>>({
    sorting: [],
    columnFilters: [],
    globalFilter: '',
    columnVisibility: {},
    grouping: [],
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  // Initialize table instance
  const tableInstance = useMemo<MRT_TableInstance<TData>>(
    () => ({
      data,
      columns,
      state: tableState,
      setTableState,
    }),
    [data, columns, tableState]
  );

  // Handle state persistence
  const { loadState, saveState } = useLocalStorageSync({
    enabled: enableStatePersistence,
    storageKey: stateStorageKey,
  });

  // Handle backend sync
  const { syncState } = useBackendSync({
    enabled: enableBackendSync,
    options: backendSyncOptions,
  });

  // Handle PDF export
  const { exportToPDF } = usePDFExport({
    enabled: enablePDFExport,
    options: pdfExportOptions,
  });

  // Load initial state
  useEffect(() => {
    if (enableStatePersistence) {
      const savedState = loadState();
      if (savedState) {
        setTableState(savedState);
      }
    }
  }, [enableStatePersistence, loadState]);

  // Handle state changes
  const handleStateChange = useCallback(
    (newState: TableState<TData>) => {
      setTableState(newState);

      if (enableDebugMode) {
        console.log('Table state changed:', newState);
      }

      if (enableStatePersistence) {
        saveState(newState);
      }

      if (enableBackendSync) {
        syncState(newState);
      }
    },
    [enableStatePersistence, enableBackendSync, enableDebugMode, saveState, syncState]
  );

  // Handle PDF export
  const handleExportPDF = useCallback(() => {
    if (enablePDFExport) {
      exportToPDF({
        data,
        columns,
        state: tableState,
      });
    }
  }, [enablePDFExport, exportToPDF, data, columns, tableState]);

  // Handle sync state
  const handleSyncState = useCallback(() => {
    if (enableBackendSync) {
      syncState(tableState);
    }
  }, [enableBackendSync, syncState, tableState]);

  return {
    tableState,
    tableInstance,
    handleStateChange,
    handleExportPDF,
    handleSyncState,
  };
} 