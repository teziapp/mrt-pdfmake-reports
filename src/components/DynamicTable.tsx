import { ChevronLeft, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_TableInstance,
  type MRT_TableOptions,
  type MRT_VisibilityState,
  type MRT_RowSelectionState,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import { generatePDF } from "../utils/pdfGenerator";

export type DataItem = Record<string, string | number>;

interface Filter {
  id: string;
  value: string | number | [number, number];
}

interface SidebarConfig {
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

interface ExportConfig {
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

const defaultFormatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(1);
};

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns: propColumns,
  sidebar = { enabled: true, width: 350, defaultOpen: true },
  export: exportConfig = { enabled: true, pdfExport: true },
  customStyles = {},
  onFilterChange,
  onSearchChange,
  onColumnVisibilityChange,
  onGroupingChange,
  onRowSelectionChange,
  formatNumber = defaultFormatNumber,
  tableOptions,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [grouping, setGrouping] = useState<string[]>([]);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebar.defaultOpen && !isMobile);
  const [selectedFilterColumn, setSelectedFilterColumn] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string | number | [number, number]>("");
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [editingFilter, setEditingFilter] = useState<string | null>(null);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const isColumnNumeric = useCallback(
    (columnId: string): boolean => {
      return data.length > 0 && typeof data[0][columnId] === "number";
    },
    [data]
  );

  const getColumnRange = useCallback(
    (columnId: string): [number, number] => {
      if (!isColumnNumeric(columnId)) return [0, 100];
      const values = data.map((item) => item[columnId] as number);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      return [min - range * 0.1, max + range * 0.1];
    },
    [data, isColumnNumeric]
  );

  const columns = useMemo<MRT_ColumnDef<DataItem>[]>(() => {
    if (propColumns) return propColumns;
    if (data.length === 0) return [];
    
    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      accessorKey: key,
      header: key,
      filterFn: (row, id, filterValue) => {
        const cellValue = row.getValue(id);
        if (isColumnNumeric(id) && Array.isArray(filterValue)) {
          const numValue = Number.parseFloat(cellValue as string);
          return numValue >= filterValue[0] && numValue <= filterValue[1];
        }
        return (cellValue as string)
          .toLowerCase()
          .includes((filterValue as string).toLowerCase());
      },
    }));
  }, [data, propColumns, isColumnNumeric]);

  const handleColumnVisibilityChange = useCallback((columnId: string) => {
    setColumnVisibility((prev) => {
      const newVisibility = {
        ...prev,
        [columnId]: prev[columnId] === undefined ? false : !prev[columnId],
      };
      onColumnVisibilityChange?.(newVisibility);
      return newVisibility;
    });
  }, [onColumnVisibilityChange]);

  const handleGroupingChange = useCallback((columnId: string) => {
    setGrouping((prev) => {
      const newGrouping = prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId];
      onGroupingChange?.(newGrouping);
      return newGrouping;
    });
  }, [onGroupingChange]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleFilterColumnChange = useCallback((event: SelectChangeEvent<string>) => {
    const columnId = event.target.value;
    setSelectedFilterColumn(columnId);
    if (isColumnNumeric(columnId)) {
      const [min, max] = getColumnRange(columnId);
      setFilterValue([min, max]);
    } else {
      setFilterValue("");
    }
  }, [isColumnNumeric, getColumnRange]);

  const handleFilterValueChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement> | Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setFilterValue(newValue as [number, number]);
    } else if (typeof event === "object" && "target" in event) {
      setFilterValue((event as React.ChangeEvent<HTMLInputElement>).target.value);
    }
  }, []);

  const updateColumnFilters = useCallback((filters: Filter[]) => {
    const newColumnFilters = filters.map((filter) => ({
      id: filter.id,
      value: filter.value,
    }));
    setColumnFilters(newColumnFilters);
    onFilterChange?.(filters);
  }, [onFilterChange]);

  const applyFilter = useCallback(() => {
    if (selectedFilterColumn && filterValue !== "") {
      const newFilter = {
        id: selectedFilterColumn,
        value: filterValue,
      };
      setActiveFilters((prev) => {
        const newFilters = [
          ...prev.filter((f) => f.id !== selectedFilterColumn),
          newFilter,
        ];
        updateColumnFilters(newFilters);
        return newFilters;
      });
      setSelectedFilterColumn("");
      setFilterValue("");
      setEditingFilter(null);
    }
  }, [selectedFilterColumn, filterValue, updateColumnFilters]);

  const editFilter = useCallback((filterId: string) => {
    const filter = activeFilters.find((f) => f.id === filterId);
    if (filter) {
      setSelectedFilterColumn(filter.id);
      setFilterValue(filter.value);
      setEditingFilter(filterId);
    }
  }, [activeFilters]);

  const removeFilter = useCallback((filterId: string) => {
    setActiveFilters((prev) => {
      const newFilters = prev.filter((f) => f.id !== filterId);
      updateColumnFilters(newFilters);
      return newFilters;
    });
    if (editingFilter === filterId) {
      setEditingFilter(null);
      setSelectedFilterColumn("");
      setFilterValue("");
    }
  }, [editingFilter, updateColumnFilters]);

  const handleExportPDF = useCallback((table: MRT_TableInstance<DataItem>) => {
    if (!exportConfig.pdfExport) return;
    
    const visibleColumns = columns
      .filter((col) => columnVisibility[col.accessorKey as string] !== false)
      .map(col => ({
        header: col.header as string,
        accessorKey: col.accessorKey as string
      }));

    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    generatePDF(filteredData, visibleColumns, "Table Export");
  }, [columns, columnVisibility, exportConfig.pdfExport]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  }, [onSearchChange]);

  const sidebarContent = sidebar.enabled && (
    <Box
      sx={{
        width: isSidebarOpen ? sidebar.width : 0,
        paddingX: 2,
        paddingY: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...customStyles.sidebar,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          mr: 5,
        }}
      >
        <Typography variant="h5">{sidebar.title || "Table Controls"}</Typography>
        <IconButton onClick={toggleSidebar}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          mx: 2,
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {sidebar.features?.search !== false && (
          <TextField
            size="small"
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
        
        {sidebar.features?.filters !== false && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Filters
            </Typography>
            <Box sx={{ mb: 2, mx: 4 }}>
              {activeFilters.map((filter) => (
                <Chip
                  key={filter.id}
                  label={`${filter.id}: ${
                    Array.isArray(filter.value)
                      ? `${formatNumber(filter.value[0])} - ${formatNumber(
                          filter.value[1]
                        )}`
                      : filter.value
                  }`}
                  onDelete={() => removeFilter(filter.id)}
                  onClick={() => editFilter(filter.id)}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            <FormControl fullWidth size="small" sx={{ mb: 1 }}>
              <InputLabel>Select Column</InputLabel>
              <Select
                value={selectedFilterColumn}
                label="Select Column"
                onChange={handleFilterColumnChange}
              >
                {columns.map((column) => (
                  <MenuItem
                    key={column.accessorKey as string}
                    value={column.accessorKey as string}
                  >
                    {column.header as string}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedFilterColumn && (
              <Box sx={{ mb: 2 }}>
                {isColumnNumeric(selectedFilterColumn) ? (
                  <Box>
                    <Slider
                      value={filterValue as [number, number]}
                      onChange={handleFilterValueChange}
                      valueLabelDisplay="auto"
                      min={getColumnRange(selectedFilterColumn)[0]}
                      max={getColumnRange(selectedFilterColumn)[1]}
                      step={
                        (getColumnRange(selectedFilterColumn)[1] -
                          getColumnRange(selectedFilterColumn)[0]) /
                        100
                      }
                      valueLabelFormat={formatNumber}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography variant="caption">
                        Min: {formatNumber(getColumnRange(selectedFilterColumn)[0])}
                      </Typography>
                      <Typography variant="caption">
                        Max: {formatNumber(getColumnRange(selectedFilterColumn)[1])}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <TextField
                    size="small"
                    fullWidth
                    label="Filter Value"
                    variant="outlined"
                    value={filterValue as string}
                    onChange={
                      handleFilterValueChange as (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => void
                    }
                  />
                )}
              </Box>
            )}
            <Button variant="contained" onClick={applyFilter} fullWidth>
              {editingFilter ? "Update Filter" : "Apply Filter"}
            </Button>
          </>
        )}

        {sidebar.features?.columnVisibility !== false && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Visibility
            </Typography>
            <List disablePadding>
              {columns.map((column) => (
                <ListItem
                  key={`visibility-${column.accessorKey as string}`}
                  disablePadding
                >
                  <ListItemText primary={column.header as string} />
                  <Switch
                    edge="end"
                    onChange={() =>
                      handleColumnVisibilityChange(column.accessorKey as string)
                    }
                    checked={
                      columnVisibility[column.accessorKey as string] !== false
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {sidebar.features?.grouping !== false && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Grouping
            </Typography>
            <List disablePadding>
              {columns.map((column) => (
                <ListItem
                  key={`grouping-${column.accessorKey as string}`}
                  disablePadding
                >
                  <ListItemText primary={column.header as string} />
                  <Switch
                    edge="end"
                    onChange={() =>
                      handleGroupingChange(column.accessorKey as string)
                    }
                    checked={grouping.includes(column.accessorKey as string)}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        ...customStyles.container,
      }}
    >
      {sidebar.enabled && (
        <Drawer
          variant={isMobile ? "temporary" : "persistent"}
          anchor="left"
          open={isSidebarOpen}
          onClose={isMobile ? toggleSidebar : undefined}
          sx={{
            width: isSidebarOpen ? sidebar.width : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isSidebarOpen ? sidebar.width : 0,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: 3,
          width: isMobile
            ? "100%"
            : `calc(100% - ${isSidebarOpen && sidebar.enabled ? sidebar.width : 0}px)`,
          ...customStyles.table,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 0 }}>
          {!isSidebarOpen && sidebar.enabled && (
            <IconButton onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection
            state={{
              columnVisibility,
              grouping,
              globalFilter: searchTerm,
              columnFilters,
              rowSelection,
            }}
            onRowSelectionChange={(updatedSelection) => {
              const newSelection = typeof updatedSelection === 'function' 
                ? updatedSelection(rowSelection)
                : updatedSelection;
              setRowSelection(newSelection);
              onRowSelectionChange?.(newSelection);
            }}
            renderTopToolbarCustomActions={({ table }) =>
              exportConfig.enabled && (
                <>
                  {exportConfig.pdfExport && (
                    <Button
                      onClick={() => handleExportPDF(table)}
                      variant="contained"
                      size="small"
                      style={{ margin: "0.5rem" }}
                    >
                      Export PDF
                    </Button>
                  )}
                  {exportConfig.customExportActions?.(table)}
                </>
              )
            }
            onColumnVisibilityChange={setColumnVisibility}
            onGroupingChange={setGrouping}
            onGlobalFilterChange={handleSearchChange}
            onColumnFiltersChange={setColumnFilters}
            positionToolbarAlertBanner="bottom"
            muiTableContainerProps={{
              sx: { maxHeight: "100%", width: "100%", m: 0, border: "black" },
            }}
            {...tableOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};
