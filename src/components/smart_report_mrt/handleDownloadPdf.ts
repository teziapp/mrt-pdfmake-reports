import { getPdfMakeDocDefinition } from "../../pdf/getPdfMakeDocDefinition";
import { downloadPdf } from "../../pdf/generatePdf";
import { headerSettings, sampleContent } from "../../pdf/staticpdfContent";

export const handleDownloadPdf = async () => {

    const docDefinition = await getPdfMakeDocDefinition(
      {
        content: sampleContent,
      },
      headerSettings
    );

    // Download the PDF
    downloadPdf(docDefinition, 'report.pdf');
  };