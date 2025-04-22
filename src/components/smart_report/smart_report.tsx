import { MaterialReactTableProps, MRT_RowData } from "material-react-table";
import { SmartReportMRT } from "../smart_report_mrt";
import { SmartTableSettings } from "../smart_drawer";
import { useState } from "react";

type SmartReportProps<T extends MRT_RowData> = {
  children: React.ReactNode;
  tableProps?: never;
} | {
  children?: never;
  tableProps: MaterialReactTableProps<T>;
}

export const SmartReport = <T extends MRT_RowData>({children, tableProps}:SmartReportProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<any[]>([]);
  const [groupBy, setGroupBy] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});

  if (children) {
    return <>{children}</>;
  }
  
  if (!tableProps) {
    return null;
  }
  
  return <>
    <SmartTableSettings<T>
      position="left-drawer"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      onSort={setSortBy}
      onGroup={setGroupBy}
      onColumnVisibilityChange={setColumnVisibility}
      tableInstance={tableProps}
    />
    <SmartReportMRT {...tableProps} />
  </>;
};