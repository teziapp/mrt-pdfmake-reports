import { useMaterialReactTable, type MRT_RowData, type MRT_TableInstance, type MaterialReactTableProps } from 'material-react-table';

export function useTableInstance<TData extends MRT_RowData>(props: MaterialReactTableProps<TData>): MRT_TableInstance<TData> {
  return useMaterialReactTable(props);
} 