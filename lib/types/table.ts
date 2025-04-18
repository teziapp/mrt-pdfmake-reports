import { MRT_ColumnDef } from 'material-react-table';

export interface SmartTableColumn<TData extends Record<string, any> = {}> extends MRT_ColumnDef<TData> {
  enablePDFExport?: boolean;
}

export interface PDFExportOptions {
  title?: string;
  subtitle?: string;
  orientation?: 'portrait' | 'landscape';
  pageSize?: string;
  fileName?: string;
  customStyles?: Record<string, any>;
} 