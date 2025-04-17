import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  ViewColumn as ViewColumnIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { MRT_TableInstance } from 'material-react-table';

interface ToolbarProps<TData extends Record<string, any>> {
  instance: MRT_TableInstance<TData>;
  onExportPDF?: () => void;
  enablePDFExport?: boolean;
}

export function Toolbar<TData extends Record<string, any>>({
  instance,
  onExportPDF,
  enablePDFExport = false,
}: ToolbarProps<TData>) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        p: '0.5rem',
        justifyContent: 'flex-end',
      }}
    >
      <Tooltip title="Search">
        <IconButton
          onClick={() => instance.setShowGlobalFilter?.((prev) => !prev)}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Filter">
        <IconButton
          onClick={() => instance.setShowColumnFilters?.((prev) => !prev)}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Show/Hide Columns">
        <IconButton
          onClick={() => instance.setShowColumnVisibility?.((prev) => !prev)}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>

      {enablePDFExport && (
        <Tooltip title="Export to PDF">
          <IconButton onClick={onExportPDF}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
} 