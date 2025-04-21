import { Button } from "@mui/material";
import TableViewIcon from '@mui/icons-material/TableView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { handleDownloadPdf } from "./handleDownloadPdf";

export interface ToolbarComponentProps {
  forceTableView?: boolean;
  setForceTableView?: (value: boolean) => void;
}

export const ViewToggleButton = ({ forceTableView, setForceTableView }: ToolbarComponentProps) => {
  if (typeof forceTableView === 'undefined' || !setForceTableView) return null;
  
  return (
    <Button 
      onClick={() => setForceTableView(!forceTableView)}
      startIcon={forceTableView ? <ViewModuleIcon /> : <TableViewIcon />}
    >
      {forceTableView ? 'Switch to Card View' : 'Switch to Table View'}
    </Button>
  );
};

export const PdfDownloadButton = () => (
  <Button 
    onClick={handleDownloadPdf}
    startIcon={<PictureAsPdfIcon />}
  >
    Download PDF
  </Button>
);

// Default toolbar components array
export const defaultToolbarComponents = [ViewToggleButton, PdfDownloadButton]; 