import { MRT_ColumnDef, MRT_AggregationFn, MRT_FilterFn, MRT_SortingFn } from 'material-react-table';

/**
 * Extended column definition with additional features
 */
export interface SmartTableColumn<TData extends Record<string, any> = {}> extends MRT_ColumnDef<TData> {
  /**
   * Enable PDF export for this column
   * @default true
   */
  enablePDFExport?: boolean;

  /**
   * Custom PDF cell renderer
   */
  pdfRenderer?: (row: TData) => any;

  /**
   * Custom cell renderer
   */
  cellRenderer?: (row: TData) => React.ReactNode;

  /**
   * Custom header renderer
   */
  headerRenderer?: (column: SmartTableColumn<TData>) => React.ReactNode;

  /**
   * Custom filter renderer
   */
  filterRenderer?: (column: SmartTableColumn<TData>) => React.ReactNode;

  /**
   * Custom aggregation function
   */
  aggregationFn?: MRT_AggregationFn<TData> | MRT_AggregationFn<TData>[];

  /**
   * Custom group renderer
   */
  groupRenderer?: (groupedRows: TData[]) => React.ReactNode;

  /**
   * Custom sort function
   */
  sortingFn?: MRT_SortingFn<TData>;

  /**
   * Custom filter function
   */
  filterFn?: MRT_FilterFn<TData>;

  /**
   * Column specific theme overrides
   */
  themeOverrides?: {
    header?: {
      backgroundColor?: string;
      color?: string;
      fontSize?: string | number;
      fontWeight?: string | number;
    };
    cell?: {
      backgroundColor?: string;
      color?: string;
      fontSize?: string | number;
      fontWeight?: string | number;
      padding?: string | number;
      textAlign?: 'left' | 'center' | 'right';
    };
  };
}

/**
 * PDF export configuration options
 */
export interface PDFExportOptions {
  /**
   * Document title
   */
  title?: string;

  /**
   * Document subtitle
   */
  subtitle?: string;

  /**
   * Document author
   */
  author?: string;

  /**
   * Document subject
   */
  subject?: string;

  /**
   * Document keywords
   */
  keywords?: string;

  /**
   * Page orientation
   * @default 'portrait'
   */
  orientation?: 'portrait' | 'landscape';

  /**
   * Page size
   * @default 'A4'
   */
  pageSize?: 'A3' | 'A4' | 'A5' | 'LETTER' | 'LEGAL';

  /**
   * Page margins
   */
  pageMargins?: [number, number, number, number];

  /**
   * Custom header content
   */
  header?: {
    content?: string | (() => any);
    height?: number;
    alignment?: 'left' | 'center' | 'right';
  };

  /**
   * Custom footer content
   */
  footer?: {
    content?: string | (() => any);
    height?: number;
    alignment?: 'left' | 'center' | 'right';
  };

  /**
   * Custom styles
   */
  styles?: {
    header?: Record<string, any>;
    cell?: Record<string, any>;
    footer?: Record<string, any>;
  };

  /**
   * Custom fonts
   */
  fonts?: Record<string, {
    normal?: string;
    bold?: string;
    italics?: string;
    bolditalics?: string;
  }>;

  /**
   * Custom metadata
   */
  metadata?: Record<string, any>;

  /**
   * Custom table layout
   */
  tableLayout?: {
    headerHeight?: number;
    rowHeight?: number;
    columnSpacing?: number;
    fillColor?: string;
    lineColor?: string;
    lineWidth?: number;
  };

  /**
   * Custom data transformers
   */
  transformers?: {
    header?: (text: string) => string;
    cell?: (value: any) => string;
  };

  /**
   * Custom filename
   */
  filename?: string | (() => string);

  /**
   * Custom compression
   */
  compression?: {
    enabled?: boolean;
    quality?: number;
  };

  /**
   * Custom encryption
   */
  encryption?: {
    userPassword?: string;
    ownerPassword?: string;
    permissions?: {
      printing?: boolean;
      modifying?: boolean;
      copying?: boolean;
      annotating?: boolean;
    };
  };
}

/**
 * Backend sync options for table state
 */
export interface BackendSyncOptions {
  /**
   * Enable backend sync
   * @default false
   */
  enabled?: boolean;

  /**
   * Sync interval in milliseconds
   * @default 5000
   */
  interval?: number;

  /**
   * Custom sync function
   */
  syncFn?: (state: any) => Promise<void>;

  /**
   * Custom load function
   */
  loadFn?: () => Promise<any>;

  /**
   * Retry options
   */
  retry?: {
    maxAttempts?: number;
    delay?: number;
    backoff?: boolean;
  };

  /**
   * Error handling
   */
  onError?: (error: Error) => void;
}

/**
 * Debug mode options
 */
export interface DebugModeOptions {
  /**
   * Enable console logging
   * @default false
   */
  enableLogging?: boolean;

  /**
   * Log level
   * @default 'info'
   */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';

  /**
   * Custom logger function
   */
  logger?: (level: string, message: string, data?: any) => void;

  /**
   * Performance monitoring
   */
  performance?: {
    enabled?: boolean;
    sampleRate?: number;
    onReport?: (metrics: any) => void;
  };
} 