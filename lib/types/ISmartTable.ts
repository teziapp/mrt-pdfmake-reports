import type { MRT_ColumnDef, MRT_RowData } from 'material-react-table';

/**
 * Props for the SmartTable component
 */
export interface SmartTableProps<TData extends MRT_RowData> {
  /**
   * Table columns configuration
   */
  columns: MRT_ColumnDef<TData>[];

  /**
   * Table data
   */
  data: TData[];

  /**
   * Enable PDF export
   */
  enablePDFExport?: boolean;
}
