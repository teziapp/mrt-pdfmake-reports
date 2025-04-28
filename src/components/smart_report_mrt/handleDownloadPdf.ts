import { getPdfMakeDocDefinition } from "../../pdf/getPdfMakeDocDefinition";
import { downloadPdf } from "../../pdf/generatePdf";
import { 
  headerSettings, 
  tableData, 
  sampleContent
} from "../../pdf/staticpdfContent";

export const handleDownloadPdf = async () => {
    const docDefinition = await getPdfMakeDocDefinition(
      {
        content: sampleContent,
      },
      headerSettings,
      tableData // Include the ledger data from staticpdfContent
    );

    // Download the PDF
    downloadPdf(docDefinition, 'document.pdf');
  };
