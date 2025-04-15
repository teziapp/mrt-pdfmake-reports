import { MRT_ColumnDef, MRT_TableInstance, MRT_TableOptions, MRT_VisibilityState } from "material-react-table";

export type DataItem = Record<string, string | number>;

export interface Filter {
  id: string;
  value: string | number | [number, number];
}

export interface SidebarConfig {
  enabled?: boolean;
  width?: number;
  defaultOpen?: boolean;
  title?: string;
  features?: {
    search?: boolean;
    filters?: boolean;
    columnVisibility?: boolean;
    grouping?: boolean;
  };
}

export interface ExportConfig {
  enabled?: boolean;
  pdfExport?: boolean;
  csvExport?: boolean;
  excelExport?: boolean;
  customExportActions?: (table: MRT_TableInstance<DataItem>) => React.ReactNode;
}

export interface DynamicTableProps {
  data: DataItem[];
  columns?: MRT_ColumnDef<DataItem>[];
  sidebar?: SidebarConfig;
  export?: ExportConfig;
  customStyles?: {
    table?: React.CSSProperties;
    sidebar?: React.CSSProperties;
    container?: React.CSSProperties;
  };
  onFilterChange?: (filters: Filter[]) => void;
  onSearchChange?: (searchTerm: string) => void;
  onColumnVisibilityChange?: (visibility: MRT_VisibilityState) => void;
  onGroupingChange?: (grouping: string[]) => void;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  formatNumber?: (value: number) => string;
  tableOptions?: Partial<MRT_TableOptions<DataItem>>;
} 