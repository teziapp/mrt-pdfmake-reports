import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, useTheme } from '@mui/material';
import { useMemo } from 'react';

export interface SmartTableProps<TData extends Record<string, any> = {}> {
  data: TData[];
  columns: MRT_ColumnDef<TData>[];
  enableColumnFilters?: boolean;
  enableGrouping?: boolean;
  enableColumnDragging?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
}

export const SmartTable = <TData extends Record<string, any> = {}>({
  data,
  columns,
  enableColumnFilters = true,
  enableGrouping = true,
  enableColumnDragging = true,
  enableGlobalFilter = true,
  enablePagination = true,
}: SmartTableProps<TData>) => {
  const theme = useTheme();

  const tableColumns = useMemo(() => columns, [columns]);
  const tableData = useMemo(() => data, [data]);

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable
        columns={tableColumns}
        data={tableData}
        enableColumnFilters={enableColumnFilters}
        enableGrouping={enableGrouping}
        enableColumnDragging={enableColumnDragging}
        enableGlobalFilter={enableGlobalFilter}
        enablePagination={enablePagination}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '0.5rem',
            border: '1px solid',
            borderColor: theme.palette.divider,
          },
        }}
      />
    </Box>
  );
}; 