import React from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';
import { DragIndicator as DragIndicatorIcon } from '@mui/icons-material';
import { MRT_TableInstance } from 'material-react-table';

interface GroupingPanelProps<TData extends Record<string, any>> {
  instance: MRT_TableInstance<TData>;
}

export function GroupingPanel<TData extends Record<string, any>>({
  instance,
}: GroupingPanelProps<TData>) {
  const { getState, getAllLeafColumns, setGrouping } = instance;
  const { grouping } = getState();

  const handleDelete = (columnId: string) => {
    const newGrouping = grouping.filter((group) => group !== columnId);
    setGrouping(newGrouping);
  };

  const getColumnLabel = (columnId: string) => {
    const column = getAllLeafColumns().find((col) => col.id === columnId);
    return column?.columnDef.header?.toString() ?? columnId;
  };

  if (!grouping.length) return null;

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        Grouped by:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {grouping.map((columnId, index) => (
          <Chip
            key={columnId}
            label={getColumnLabel(columnId)}
            onDelete={() => handleDelete(columnId)}
            icon={<DragIndicatorIcon />}
            sx={{
              '& .MuiChip-icon': {
                cursor: 'grab',
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
} 