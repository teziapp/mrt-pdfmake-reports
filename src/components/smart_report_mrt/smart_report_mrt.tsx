import { MaterialReactTable, MaterialReactTableProps, MRT_RowData } from "material-react-table";

export const SmartReportMRT = <T extends MRT_RowData>(props: MaterialReactTableProps<T>) => {
  return (
    <MaterialReactTable
      {...props}
    />
  );
};