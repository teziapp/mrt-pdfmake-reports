import { MRT_TableOptions, MRT_ColumnDef } from 'material-react-table';

export interface SmartTableProps<TData extends Record<string, any>> extends Omit<MRT_TableOptions<TData>, 'data'> {
  /**
   * The data to display in the table
   */
  data: TData[];
  
  /**
   * Whether to enable state persistence
   * @default false
   */
  enableStatePersistence?: boolean;
  
  /**
   * Storage key for persisting table state
   * @default 'smartTable'
   */
  stateStorageKey?: string;
  
  /**
   * Whether to enable PDF export
   * @default false
   */
  enablePDFExport?: boolean;
  
  /**
   * PDF export options
   */
  pdfExportOptions?: PDFExportOptions;
  
  /**
   * Whether to enable backend sync
   * @default false
   */
  enableBackendSync?: boolean;
  
  /**
   * Backend sync options
   */
  backendSyncOptions?: BackendSyncOptions;
  
  /**
   * Whether to enable debug mode
   * @default false
   */
  enableDebugMode?: boolean;
}

export interface PDFExportOptions {
  /**
   * Document title
   */
  title?: string;
  
  /**
   * Page orientation
   * @default 'portrait'
   */
  orientation?: 'portrait' | 'landscape';
  
  /**
   * Page size
   * @default 'A4'
   */
  pageSize?: string;
  
  /**
   * Custom styles for the PDF
   */
  styles?: Record<string, any>;
  
  /**
   * Custom header content
   */
  header?: () => any;
  
  /**
   * Custom footer content
   */
  footer?: () => any;
}

export interface BackendSyncOptions {
  /**
   * API endpoint for syncing table state
   */
  endpoint: string;
  
  /**
   * Authentication token
   */
  token?: string;
  
  /**
   * Custom headers
   */
  headers?: Record<string, string>;
  
  /**
   * Sync interval in milliseconds
   * @default 30000
   */
  syncInterval?: number;
  
  /**
   * Whether to enable auto-sync
   * @default true
   */
  enableAutoSync?: boolean;
}

export interface TableState<TData extends Record<string, any>> {
  sorting: {
    id: keyof TData;
    desc: boolean;
  }[];
  columnFilters: {
    id: keyof TData;
    value: any;
  }[];
  globalFilter: string;
  columnVisibility: Record<keyof TData, boolean>;
  grouping: (keyof TData)[];
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export type SmartTableColumn<TData extends Record<string, any>> = MRT_ColumnDef<TData> & {
  /**
   * Whether to enable PDF export for this column
   * @default true
   */
  enablePDFExport?: boolean;
  
  /**
   * Custom PDF cell renderer
   */
  pdfRenderer?: (row: TData) => any;
}; 