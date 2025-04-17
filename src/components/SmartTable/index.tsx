import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { SmartTableProps } from '@/types/table';
import { useSmartTable } from '@/hooks/useSmartTable';
import { Toolbar } from '@/components/Toolbar';
import { ColumnVisibilityMenu } from '@/components/ColumnVisibilityMenu';
import { GroupingPanel } from '@/components/GroupingPanel';
import { PaginationControls } from '@/components/PaginationControls';

function SmartTable<TData extends Record<string, any>>({
  data = [],
  columns = [],
  enableStatePersistence = false,
  stateStorageKey = 'smartTable',
  enablePDFExport = false,
  pdfExportOptions,
  enableBackendSync = false,
  backendSyncOptions,
  enableDebugMode = false,
  muiTableContainerProps,
  ...restProps
}: SmartTableProps<TData>) {
  const {
    tableState,
    tableInstance,
    handleStateChange,
    handleExportPDF,
    handleSyncState,
  } = useSmartTable({
    data,
    columns,
    enableStatePersistence,
    stateStorageKey,
    enablePDFExport,
    pdfExportOptions,
    enableBackendSync,
    backendSyncOptions,
    enableDebugMode,
    muiTableContainerProps: muiTableContainerProps || { 
      sx: { maxHeight: '500px' } 
    },
    enableGrouping: true,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    enablePinning: true,
    enableRowSelection: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    ...restProps
  });

  const renderTopToolbar = useMemo(
    () => (
      <Toolbar
        instance={tableInstance}
        onExportPDF={handleExportPDF}
        enablePDFExport={enablePDFExport}
      />
    ),
    [tableInstance, handleExportPDF, enablePDFExport]
  );

  const renderBottomToolbar = useMemo(
    () => (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        <ColumnVisibilityMenu instance={tableInstance} />
        <PaginationControls instance={tableInstance} />
      </Box>
    ),
    [tableInstance]
  );

  return (
    <Box sx={{ width: '100%' }}>
      {tableState.grouping.length > 0 && <GroupingPanel instance={tableInstance} />}
      
      {/* Just use the table instance without additional props */}
      <MaterialReactTable table={tableInstance} />
    </Box>
  );
}

export default SmartTable; 