import { useCallback } from 'react';
import type {
  MRT_TableInstance,
  MRT_ColumnOrderState,
  MRT_VisibilityState,
  MRT_DensityState,
  MRT_GroupingState,
  MRT_RowSelectionState,
  MRT_RowData,
} from 'material-react-table';

type Updater<T> = T | ((old: T) => T);

export interface TableEvents<TData extends MRT_RowData = Record<string, any>> {
  onColumnOrderChange?: (updater: (old: MRT_ColumnOrderState) => MRT_ColumnOrderState) => void;
  onColumnVisibilityChange?: (updater: (old: MRT_VisibilityState) => MRT_VisibilityState) => void;
  onDensityChange?: (updater: (old: MRT_DensityState) => MRT_DensityState) => void;
  onGroupingChange?: (updater: (old: MRT_GroupingState) => MRT_GroupingState) => void;
  onRowSelectionChange?: (updater: (old: MRT_RowSelectionState) => MRT_RowSelectionState) => void;
  onShowColumnFiltersChange?: (updater: (old: boolean) => boolean) => void;
  onShowGlobalFilterChange?: (updater: (old: boolean) => boolean) => void;
}

export const useTableEvents = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  events?: TableEvents<TData>
) => {
  const handleColumnOrderChange = useCallback(
    (updater: (old: MRT_ColumnOrderState) => MRT_ColumnOrderState) => {
      events?.onColumnOrderChange?.(updater);
      table.setColumnOrder(updater);
    },
    [events, table]
  );

  const handleColumnVisibilityChange = useCallback(
    (updater: (old: MRT_VisibilityState) => MRT_VisibilityState) => {
      events?.onColumnVisibilityChange?.(updater);
      table.setColumnVisibility(updater);
    },
    [events, table]
  );

  const handleDensityChange = useCallback(
    (updater: (old: MRT_DensityState) => MRT_DensityState) => {
      events?.onDensityChange?.(updater);
      table.setDensity(updater);
    },
    [events, table]
  );

  const handleGroupingChange = useCallback(
    (updater: (old: MRT_GroupingState) => MRT_GroupingState) => {
      events?.onGroupingChange?.(updater);
      table.setGrouping(updater);
    },
    [events, table]
  );

  const handleRowSelectionChange = useCallback(
    (updater: (old: MRT_RowSelectionState) => MRT_RowSelectionState) => {
      events?.onRowSelectionChange?.(updater);
      table.setRowSelection(updater);
    },
    [events, table]
  );

  const handleShowColumnFiltersChange = useCallback(
    (updater: (old: boolean) => boolean) => {
      events?.onShowColumnFiltersChange?.(updater);
      table.setShowColumnFilters(updater);
    },
    [events, table]
  );

  const handleShowGlobalFilterChange = useCallback(
    (updater: (old: boolean) => boolean) => {
      events?.onShowGlobalFilterChange?.(updater);
      table.setShowGlobalFilter(updater);
    },
    [events, table]
  );

  return {
    handleColumnOrderChange,
    handleColumnVisibilityChange,
    handleDensityChange,
    handleGroupingChange,
    handleRowSelectionChange,
    handleShowColumnFiltersChange,
    handleShowGlobalFilterChange,
  };
}; 