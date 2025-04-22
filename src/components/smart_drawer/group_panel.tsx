import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Collapse, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

interface GroupPanelProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  onGroup: (groupBy: string[]) => void;
  open: boolean;
}

export const GroupPanel = <TData extends Record<string, any>>({
  columns,
  onGroup,
  open,
}: GroupPanelProps<TData>) => {
  const [groupByColumns, setGroupByColumns] = React.useState<string[]>(['']);

  const handleAddGroup = () => {
    setGroupByColumns([...groupByColumns, '']);
  };

  const handleRemoveGroup = (index: number) => {
    const newGroupByColumns = [...groupByColumns];
    newGroupByColumns.splice(index, 1);
    setGroupByColumns(newGroupByColumns);
  };

  const handleGroupChange = (index: number, value: string) => {
    const newGroupByColumns = [...groupByColumns];
    newGroupByColumns[index] = value;
    setGroupByColumns(newGroupByColumns);
  };

  const handleApplyGroups = () => {
    const validGroups = groupByColumns.filter(Boolean);
    onGroup(validGroups);
  };

  return (
    <Collapse in={open}>
      <Box sx={{ p: 2 }}>
        {groupByColumns.map((column, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: 1,
              mb: 2,
              alignItems: 'center',
            }}
          >
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Group by</InputLabel>
              <Select
                value={column}
                label="Group by"
                onChange={(e) => handleGroupChange(index, e.target.value)}
              >
                {columns.map((col) => (
                  <MenuItem
                    key={col.accessorKey as string}
                    value={col.accessorKey as string}
                  >
                    {col.header as string}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton
              size="small"
              onClick={() => handleRemoveGroup(index)}
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddGroup}
            variant="outlined"
            size="small"
          >
            Add Group
          </Button>
          <Button
            onClick={handleApplyGroups}
            variant="contained"
            size="small"
          >
            Apply Groups
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
}; 