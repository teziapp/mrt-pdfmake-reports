import { MaterialReactTable, type MRT_RowData, type MaterialReactTableProps, type MRT_TableInstance, type MRT_ColumnFiltersState, type MRT_ColumnDef, type MRT_TableOptions, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { usePDFExport } from '../../hooks/usePDFExport';
import { SmartTableColumn } from '../../types/table';
import { useTableState } from '../../hooks/useTableState';
import { useTableData } from '../../hooks/useTableData';
import { useTableEvents } from '../../hooks/useTableEvents';
import { useTableTheme } from '../../hooks/useTableTheme';
import { SmartTableProps } from './types/ISmartTable';

/**
 * SmartTable - A highly customizable wrapper around MaterialReactTable
 * 
 * Features:
 * - Full TypeScript support
 * - Server-side pagination, sorting, and filtering
 * - PDF export with customizable templates
 * - State persistence
 * - Theme customization
 * - Custom components and renderers
 * - Event handling
 */
export const SmartTable = <TData extends MRT_RowData>({
  // Core props
  columns,
  data,
  events,
  
  // Data fetching
  fetchData,
  initialPageSize = 10,
  rowCount = 10000,
  enablePaginatedDataFetch = true,
  
  // State management
  enableStatePersistence = false,
  stateStorageKey = 'smartTable',
  
  // PDF Export
  enablePDFExport = false,
  pdfExportOptions,
  useMockExport = false,
  onExport,
  
  // Customization
  themeOverrides,
  components,
  renderers,
  
  // Additional MRT props
  ...props
}: SmartTableProps<TData>) => {
  // Local state
  const [dataState, setDataState] = useState<TData[]>(data || []);
  
  // Memoize theme props to prevent unnecessary re-renders
  const themeProps = useMemo(() => ({
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        '& .MuiTableHead-root .MuiTableCell-root': {
          backgroundColor: themeOverrides?.header?.backgroundColor,
          color: themeOverrides?.header?.color,
          fontSize: themeOverrides?.header?.fontSize,
          fontWeight: themeOverrides?.header?.fontWeight,
          borderColor: themeOverrides?.header?.borderColor,
          height: themeOverrides?.header?.height,
        },
      },
    },
  }), [themeOverrides]);
  
  // Use custom hooks for different functionalities
  const {
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
  } = useTableState({
    initialPageSize,
    enableStatePersistence,
    stateStorageKey,
  });

  // Only use useTableData hook if fetchData is provided and data is not
  const { loadData } = !data && fetchData ? useTableData({
    fetchData,
    columns,
    enablePaginatedDataFetch,
    rowCount,
    pagination,
    sorting,
    globalFilter,
    columnFilters,
    setIsLoading,
    setData: setDataState,
    setPageCount,
  }) : { loadData: () => {} };

  // Initialize the PDF export hook
  const { exportToPDF } = usePDFExport<TData>({
    enabled: enablePDFExport && !useMockExport,
    options: pdfExportOptions,
  });

  // Load data when dependencies change, but only if fetchData is being used
  useEffect(() => {
    if (!data && fetchData) {
      loadData();
    }
  }, [data, fetchData, loadData]);

  // Handle PDF export
  const handleExportPDF = useCallback(() => {
    if (!enablePDFExport) return;
    
    console.log('Exporting PDF...', useMockExport ? '(MOCK)' : '(REAL)');
    
    const tableState = {
      sorting: sorting.map(sort => ({ id: sort.id, desc: sort.desc })),
      columnVisibility: {} as Record<string, boolean>,
      pagination: { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize },
      columnFilters: columnFilters.map(filter => ({ 
        id: filter.id, 
        value: String(filter.value ?? '') 
      })),
      globalFilter,
    };

    // Collect column visibility information
    columns.forEach((column) => {
      if (column.accessorKey) {
        tableState.columnVisibility[column.accessorKey as string] = column.enableHiding !== false;
      }
    });

    // Convert MRT columns to SmartTableColumns for PDF export
    const smartTableColumns = columns.map((col) => ({
      ...col,
      enablePDFExport: (col as SmartTableColumn<TData>).enablePDFExport !== false,
    })) as SmartTableColumn<TData>[];

    // Use the chosen exporter
    exportToPDF({
      data: dataState,
      columns: smartTableColumns,
      state: tableState,
    });

    // Call the export callback if provided
    if (onExport && !useMockExport) {
      onExport();
    }
  }, [
    enablePDFExport,
    dataState,
    columns,
    exportToPDF,
    sorting,
    pagination,
    columnFilters,
    globalFilter,
    useMockExport,
    onExport,
  ]);

  // Create table options
  const tableOptions = useMemo<MRT_TableOptions<TData>>(() => ({
    columns,
    data: dataState,
    state: {
      isLoading,
      pagination,
      sorting,
      globalFilter,
      columnFilters,
    },
    renderTopToolbarCustomActions: ({ table }) => {
      return enablePDFExport ? (
        <Tooltip title="Export to PDF">
          <IconButton onClick={handleExportPDF}>
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
      ) : null;
    },
    pageCount,
    manualPagination: !data && fetchData ? true : false,
    manualSorting: !data && fetchData ? true : false,
    manualFiltering: !data && fetchData ? true : false,
    ...themeProps,
    ...props,
  }), [
    columns,
    dataState,
    isLoading,
    pagination,
    sorting,
    globalFilter,
    columnFilters,
    enablePDFExport,
    handleExportPDF,
    pageCount,
    themeProps,
    props,
    data,
    fetchData
  ]);

  // Create table instance using MRT's hook
  const table = useMaterialReactTable(tableOptions);

  // Get event handlers
  const eventHandlers = useTableEvents<TData>(table, events);

  // Combine all props for MaterialReactTable
  const tableProps: MaterialReactTableProps<TData> = {
    table,
    ...eventHandlers,
  };

  // Render custom components if provided
  const renderCustomComponents = () => {
    if (!components) return null;
    
    return Object.entries(components).map(([key, Component]) => (
      Component && <Component key={key} table={table} />
    ));
  };

  // Render custom toolbar actions if provided
  const renderToolbarActions = () => {
    if (!renderers?.toolbarExternalActions) return null;
    
    return renderers.toolbarExternalActions({ 
      table 
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Render custom components */}
      {renderCustomComponents()}

      {/* Main table */}
      <MaterialReactTable {...tableProps} />
      
      {/* Custom toolbar actions */}
      {renderToolbarActions()}
      
    </Box>
  );
}; 