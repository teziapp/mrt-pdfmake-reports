import { getPdfMakeDocDefinition } from "../../pdf/getPdfMakeDocDefinition";
import { downloadPdf } from "../../pdf/generatePdf";
import { 
  headerSettings, 
  sampleContent, 
  ledgerData, 
  headerRightStrings
} from "../../pdf/staticpdfContent";

export const handleDownloadPdf = async () => {
    // Create a copy of headerSettings to avoid modifying the original
    const customHeaderSettings = { 
      ...headerSettings,
      // Update the header right strings with data from the ledger table
      headerRightStrings: headerRightStrings
    };

    const docDefinition = await getPdfMakeDocDefinition(
      {
        content: sampleContent,
      },
      customHeaderSettings,
      ledgerData // Include the ledger data from staticpdfContent
    );

    // Download the PDF
    downloadPdf(docDefinition, 'document.pdf');
  };
