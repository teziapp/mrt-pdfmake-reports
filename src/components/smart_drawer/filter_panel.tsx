import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

interface FilterCondition {
  id: string;
  column: string;
  operator: string;
  value: string;
}

interface FilterPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onFilter: (filters: FilterCondition[]) => void;
  open: boolean;
}

const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'startsWith', label: 'Starts with' },
  { value: 'endsWith', label: 'Ends with' },
  { value: 'greaterThan', label: 'Greater than' },
  { value: 'lessThan', label: 'Less than' },
];

export const FilterPanel = <TData extends Record<string, any>>({
  columns,
  onFilter,
  open,
}: FilterPanelProps<TData>) => {
  const [filters, setFilters] = React.useState<FilterCondition[]>([
    { id: '1', column: '', operator: 'equals', value: '' },
  ]);

  const handleAddFilter = () => {
    setFilters([
      ...filters,
      {
        id: Math.random().toString(36).substr(2, 9),
        column: '',
        operator: 'equals',
        value: '',
      },
    ]);
  };

  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const handleFilterChange = (
    id: string,
    field: keyof FilterCondition,
    value: string,
  ) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  const handleApplyFilters = () => {
    const validFilters = filters.filter(
      (f) => f.column && f.operator && f.value,
    );
    onFilter(validFilters);
  };

  return (
    <Collapse in={open}>
      <Box sx={{ p: 2 }}>
        {filters.map((filter) => (
          <Box
            key={filter.id}
            sx={{
              display: 'flex',
              gap: 1,
              mb: 2,
              alignItems: 'center',
            }}
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Column</InputLabel>
              <Select
                value={filter.column}
                label="Column"
                onChange={(e) =>
                  handleFilterChange(filter.id, 'column', e.target.value)
                }
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={filter.operator}
                label="Operator"
                onChange={(e) =>
                  handleFilterChange(filter.id, 'operator', e.target.value)
                }
              >
                {operators.map((op) => (
                  <MenuItem key={op.value} value={op.value}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              value={filter.value}
              onChange={(e) =>
                handleFilterChange(filter.id, 'value', e.target.value)
              }
              placeholder="Value"
            />

            <IconButton
              size="small"
              onClick={() => handleRemoveFilter(filter.id)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddFilter}
            variant="outlined"
            size="small"
          >
            Add Filter
          </Button>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            size="small"
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
}; 