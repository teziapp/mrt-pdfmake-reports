import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from '@mui/material';
import { MRT_TableInstance } from 'material-react-table';

interface ColumnVisibilityMenuProps<TData extends Record<string, any>> {
  instance: MRT_TableInstance<TData>;
}

export function ColumnVisibilityMenu<TData extends Record<string, any>>({
  instance,
}: ColumnVisibilityMenuProps<TData>) {
  const { getAllColumns, getAllLeafColumns } = instance;
  const columns = getAllLeafColumns();

  const handleToggleColumn = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.toggleVisibility?.();
    }
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    columns.forEach((column) => {
      if (column.getIsVisible() !== checked) {
        column.toggleVisibility?.();
      }
    });
  };

  const allChecked = columns.every((column) => column.getIsVisible());
  const someChecked = columns.some((column) => column.getIsVisible());

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: 200,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Show/Hide Columns
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={handleToggleAll}
            />
          }
          label="Toggle All"
        />
        <Box sx={{ ml: 2 }}>
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={column.getIsVisible()}
                  onChange={() => handleToggleColumn(column.id)}
                />
              }
              label={column.columnDef.header?.toString() ?? column.id}
            />
          ))}
        </Box>
      </FormGroup>
    </Paper>
  );
} 