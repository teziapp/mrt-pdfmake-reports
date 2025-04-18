import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, IconButton, Tooltip } from '@mui/material';
import { type MRT_RowData, MaterialReactTable } from 'material-react-table';
import type { SmartTableProps } from '../../types/ISmartTable';

export const SmartTable = <TData extends MRT_RowData>({
  // Core props
  columns,
  data,
  enablePDFExport = true,
}: SmartTableProps<TData>) => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Main table */}
      <MaterialReactTable
        columns={columns}
        data={data}
        renderTopToolbarCustomActions={() => {
          return enablePDFExport ? (
            <Tooltip title="Export to PDF">
              <IconButton onClick={() => console.log('Export to PDF')}>
                <PictureAsPdfIcon />
              </IconButton>
            </Tooltip>
          ) : null;
        }}
      />
    </Box>
  );
};
