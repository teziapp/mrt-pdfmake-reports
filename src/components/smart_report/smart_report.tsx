import { MaterialReactTableProps, MRT_RowData } from "material-react-table";
import { SmartReportMRT } from "../smart_report_mrt";

type SmartReportProps<T extends MRT_RowData> = {
  children: React.ReactNode;
  tableProps?: never;
} | {
  children?: never;
  tableProps: MaterialReactTableProps<T>;
}

export const SmartReport = <T extends MRT_RowData>({children, tableProps}:SmartReportProps<T>) => {
  if (children) {
    return <>{children}</>;
  }
  
  if (!tableProps) {
    return null;
  }
  
  return <SmartReportMRT {...tableProps} />;
}