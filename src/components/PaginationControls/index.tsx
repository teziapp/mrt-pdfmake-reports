import React from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
} from '@mui/icons-material';
import { MRT_TableInstance } from 'material-react-table';

interface PaginationControlsProps<TData extends Record<string, any>> {
  instance: MRT_TableInstance<TData>;
}

export function PaginationControls<TData extends Record<string, any>>({
  instance,
}: PaginationControlsProps<TData>) {
  const {
    getState,
    setPageIndex,
    setPageSize,
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
  } = instance;

  const { pagination } = getState();
  const { pageIndex, pageSize } = pagination;

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Rows per page:</Typography>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          size="small"
          sx={{ minWidth: 80 }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">
          Page {pageIndex + 1} of {getPageCount()}
        </Typography>
        <IconButton
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
          size="small"
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={!getCanPreviousPage()}
          size="small"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={!getCanNextPage()}
          size="small"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <IconButton
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
          size="small"
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
} 