import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

interface SortCondition {
  id: string;
  column: string;
  direction: 'asc' | 'desc';
}

interface SortPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onSort: (sortBy: SortCondition[]) => void;
  open: boolean;
}

export const SortPanel = <TData extends Record<string, any>>({
  columns,
  onSort,
  open,
}: SortPanelProps<TData>) => {
  const [sortConditions, setSortConditions] = React.useState<SortCondition[]>([
    { id: '1', column: '', direction: 'asc' },
  ]);

  const handleAddSort = () => {
    setSortConditions([
      ...sortConditions,
      {
        id: Math.random().toString(36).substr(2, 9),
        column: '',
        direction: 'asc',
      },
    ]);
  };

  const handleRemoveSort = (id: string) => {
    setSortConditions(sortConditions.filter((s) => s.id !== id));
  };

  const handleSortChange = (
    id: string,
    field: keyof SortCondition,
    value: string,
  ) => {
    setSortConditions(
      sortConditions.map((s) =>
        s.id === id ? { ...s, [field]: value } : s,
      ),
    );
  };

  const handleApplySort = () => {
    const validSortConditions = sortConditions.filter(
      (s) => s.column && s.direction,
    );
    onSort(validSortConditions);
  };

  return (
    <Collapse in={open}>
      <Box sx={{ p: 2 }}>
        {sortConditions.map((sort) => (
          <Box
            key={sort.id}
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
                value={sort.column}
                label="Column"
                onChange={(e) =>
                  handleSortChange(sort.id, 'column', e.target.value)
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
              <InputLabel>Direction</InputLabel>
              <Select
                value={sort.direction}
                label="Direction"
                onChange={(e) =>
                  handleSortChange(sort.id, 'direction', e.target.value)
                }
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>

            <IconButton
              size="small"
              onClick={() => handleRemoveSort(sort.id)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddSort}
            variant="outlined"
            size="small"
          >
            Add Sort
          </Button>
          <Button
            onClick={handleApplySort}
            variant="contained"
            size="small"
          >
            Apply Sort
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
}; 