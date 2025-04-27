import { MaterialReactTableProps, MRT_RowData, MRT_ColumnDef, MRT_TableInstance } from "material-react-table";
import { TableContextProvider } from "../../TableContextProvider";
import { SmartReportMRT } from "../smart_report_mrt/smart_report_mrt";
import { SmartTableSettings } from "../smart_table_settings/smart_table_settings";
type SmartReportProps<T extends MRT_RowData> = {
  tableProps: Omit<MaterialReactTableProps<T>, 'columns' | 'data'> & {
    columns: MRT_ColumnDef<T>[];
    data: T[];
  };
  table?: MRT_TableInstance<T>;
}

export const SmartReport = <T extends MRT_RowData>({
  tableProps, 
  table
}: SmartReportProps<T>) => {
  
  return (
    <TableContextProvider tableProps={tableProps} table={table}>
        <SmartTableSettings />
        <SmartReportMRT />
    </TableContextProvider>
  );
}; 