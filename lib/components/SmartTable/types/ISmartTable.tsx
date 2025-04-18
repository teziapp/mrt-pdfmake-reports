import { MRT_TableInstance, MRT_RowData, MaterialReactTableProps, MRT_ColumnDef } from 'material-react-table';
import { FetchDataOptions, FetchDataResult } from '../../../types/data';
import { TableEvents } from '../../../hooks/useTableEvents';
import { SmartTableThemeOverrides } from '../../../types/theme';
import { PDFExportOptions } from '../../../types/table';

/**
 * Props for custom components that receive the table instance
 */
export interface SmartTableComponentProps<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

/**
 * Custom component types that can be provided to SmartTable
 */
export interface SmartTableComponents<TData extends MRT_RowData> {
  /**
   * Custom toolbar component
   */
  Toolbar?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom column visibility toggle component
   */
  ColumnVisibilityToggle?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom filter chips component
   */
  FilterChips?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom pagination controls component
   */
  PaginationControls?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom loading overlay component
   */
  LoadingOverlay?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom no data component
   */
  NoDataComponent?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom status bar component
   */
  StatusBar?: React.ComponentType<SmartTableComponentProps<TData>>;

  /**
   * Custom toolbar external actions component
   */
  ToolbarExternalActions?: React.ComponentType<SmartTableComponentProps<TData>>;
}

/**
 * Custom renderer functions that can be provided to SmartTable
 */
export interface SmartTableRenderers<TData extends MRT_RowData> {
  /**
   * Custom toolbar alert banner renderer
   */
  toolbarAlertBanner?: (props: SmartTableComponentProps<TData>) => React.ReactNode;

  /**
   * Custom toolbar internal actions renderer
   */
  toolbarInternalActions?: (props: SmartTableComponentProps<TData>) => React.ReactNode;

  /**
   * Custom toolbar external actions renderer
   */
  toolbarExternalActions?: (props: SmartTableComponentProps<TData>) => React.ReactNode;

  /**
   * Custom cell renderer
   */
  cell?: (props: SmartTableComponentProps<TData> & { cell: any }) => React.ReactNode;

  /**
   * Custom header cell renderer
   */
  headerCell?: (props: SmartTableComponentProps<TData> & { column: MRT_ColumnDef<TData> }) => React.ReactNode;

  /**
   * Custom detail panel renderer
   */
  detailPanel?: (props: SmartTableComponentProps<TData> & { row: any }) => React.ReactNode;
}

/**
 * Props for the SmartTable component
 */
export interface SmartTableProps<TData extends MRT_RowData> extends Omit<MaterialReactTableProps<TData>, keyof TableEvents<TData>> {
  /**
   * Table columns configuration
   */
  columns: MRT_ColumnDef<TData>[];

  /**
   * Table data
   */
  data: TData[];

  /**
   * Event handlers for table interactions
   */
  events?: TableEvents<TData>;

  /**
   * Function to fetch data with pagination, sorting, and filtering
   * Only required when not using client-side data
   */
  fetchData?: (options: FetchDataOptions) => Promise<FetchDataResult<TData>>;

  /**
   * Initial page size
   * @default 10
   */
  initialPageSize?: number;

  /**
   * Total row count (for server-side pagination)
   * @default 10000
   */
  rowCount?: number;

  /**
   * Enable server-side pagination
   * @default true
   */
  enablePaginatedDataFetch?: boolean;

  /**
   * Enable state persistence to localStorage
   * @default false
   */
  enableStatePersistence?: boolean;

  /**
   * Key for localStorage state persistence
   * @default 'smartTable'
   */
  stateStorageKey?: string;

  /**
   * Enable PDF export functionality
   * @default false
   */
  enablePDFExport?: boolean;

  /**
   * PDF export configuration
   */
  pdfExportOptions?: PDFExportOptions;

  /**
   * Use mock export (for testing)
   * @default false
   */
  useMockExport?: boolean;

  /**
   * Callback when export is triggered
   */
  onExport?: () => void;

  /**
   * Theme overrides for the table
   */
  themeOverrides?: SmartTableThemeOverrides;

  /**
   * Custom components to override default ones
   */
  components?: SmartTableComponents<TData>;

  /**
   * Custom renderers for specific parts of the table
   */
  renderers?: SmartTableRenderers<TData>;
}
  