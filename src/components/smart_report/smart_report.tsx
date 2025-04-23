import { MaterialReactTableProps, MRT_RowData, MRT_VisibilityState, MRT_ColumnFiltersState, MRT_SortingState, MRT_GroupingState, MRT_PaginationState } from "material-react-table";
import { SmartReportMRT } from "../smart_report_mrt";
import { SmartTableSettings } from "../smart_drawer";
import { useState, useMemo } from "react";
import { OnChangeFn, Updater } from "@tanstack/react-table";
import { SmartTableSettingsProps } from "../smart_drawer/smart_table_settings";

export interface TableState {
  searchTerm: string;
  filters: MRT_ColumnFiltersState;
  sortBy: MRT_SortingState;
  groupBy: MRT_GroupingState;
  columnVisibility: MRT_VisibilityState;
  pagination: MRT_PaginationState;
}

type SmartReportProps<T extends MRT_RowData> = {
  children: React.ReactNode;
  tableProps?: never;
  tableSettings?: never;
} | {
  children?: never;
  tableProps: MaterialReactTableProps<T>;
  tableSettings: SmartTableSettingsProps<T>;
}

export const SmartReport = <T extends MRT_RowData>({children, tableProps, tableSettings}:SmartReportProps<T>) => {
  const [tableState, setTableState] = useState<TableState>({
    searchTerm: '',
    filters: [],
    sortBy: [],
    groupBy: [],
    columnVisibility: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  });

  const enhancedTableProps = useMemo<MaterialReactTableProps<T> | undefined>(() => {
    if (!tableProps) return undefined;
    
    const { columns = [], data = [], ...rest } = tableProps;
    return {
      ...rest,
      columns,
      data,
      enableGlobalFilter: true,
      enableColumnFilters: true,
      enableSorting: true,
      enableGrouping: true,
      // enableColumnVisibility: true,
      enablePagination: true,
      manualPagination: true,
      manualFiltering: true,
      manualSorting: true,
      manualGrouping: true,
      onGlobalFilterChange: (searchTerm: string) => {
        setTableState(prev => ({ ...prev, searchTerm }));
      },
      onColumnFiltersChange: ((updaterOrValue: Updater<MRT_ColumnFiltersState>) => {
        setTableState(prev => {
          const newFilters = typeof updaterOrValue === 'function'
            ? updaterOrValue(prev.filters)
            : updaterOrValue;
          return { ...prev, filters: newFilters };
        });
      }) as OnChangeFn<MRT_ColumnFiltersState>,
      onSortingChange: ((updaterOrValue: Updater<MRT_SortingState>) => {
        setTableState(prev => {
          const newSortBy = typeof updaterOrValue === 'function'
            ? updaterOrValue(prev.sortBy)
            : updaterOrValue;
          return { ...prev, sortBy: newSortBy };
        });
      }) as OnChangeFn<MRT_SortingState>,
      onGroupingChange: ((updaterOrValue: Updater<MRT_GroupingState>) => {
        setTableState(prev => {
          const newGroupBy = typeof updaterOrValue === 'function'
            ? updaterOrValue(prev.groupBy)
            : updaterOrValue;
          return { ...prev, groupBy: newGroupBy };
        });
      }) as OnChangeFn<MRT_GroupingState>,
      onColumnVisibilityChange: ((updaterOrValue: Updater<MRT_VisibilityState>) => {
        setTableState(prev => {
          const newVisibility = typeof updaterOrValue === 'function' 
            ? updaterOrValue(prev.columnVisibility)
            : updaterOrValue;
          return { ...prev, columnVisibility: newVisibility };
        });
      }) as OnChangeFn<MRT_VisibilityState>,
      onPaginationChange: ((updaterOrValue: Updater<MRT_PaginationState>) => {
        setTableState(prev => {
          const newPagination = typeof updaterOrValue === 'function'
            ? updaterOrValue(prev.pagination)
            : updaterOrValue;
          return { ...prev, pagination: newPagination };
        });
      }) as OnChangeFn<MRT_PaginationState>,
      state: {
        globalFilter: tableState.searchTerm,
        columnFilters: tableState.filters,
        sorting: tableState.sortBy,
        grouping: tableState.groupBy,
        columnVisibility: tableState.columnVisibility,
        pagination: tableState.pagination,
      }
    } as MaterialReactTableProps<T>;
  }, [tableProps, tableState]);

  if (children) {
    return <>{children}</>;
  }
  
  if (!tableProps || !enhancedTableProps) {
    return null;
  }
  
  return <>
    <SmartTableSettings<T>
      position="left-drawer"
      onSearch={(searchTerm) => setTableState(prev => ({ ...prev, searchTerm }))}
      onFilter={(filters) => setTableState(prev => ({ ...prev, filters }))}
      onSort={(sortBy) => setTableState(prev => ({ ...prev, sortBy }))}
      onGroup={(groupBy) => setTableState(prev => ({ ...prev, groupBy }))}
      onColumnVisibilityChange={(columnVisibility) => setTableState(prev => ({ ...prev, columnVisibility }))}
      tableInstance={enhancedTableProps}
      tableState={tableState}
    />
    <SmartReportMRT {...enhancedTableProps} />
  </>;
}; 