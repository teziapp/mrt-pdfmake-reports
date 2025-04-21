import { getPdfMakeDocDefinition } from "../../pdf/getPdfMakeDocDefinition";
import { downloadPdf } from "../../pdf/generatePdf";
import { defaultCompanyDetails, defaultPdfSettings, sampleContent } from "../../pdf/staticpdfContent";

export const handleDownloadPdf = async () => {
    // For now, we'll use the static content from staticpdfContent.ts
    const docDefinition = await getPdfMakeDocDefinition(
      {
        content: sampleContent,
      },
      {
        template: defaultPdfSettings.template,
        companyDetails: defaultCompanyDetails,
        headerOnEveryPage: defaultPdfSettings.headerOnEveryPage,
        headerRightStrings: defaultPdfSettings.headerRightStrings
      }
    );

    // Download the PDF
    downloadPdf(docDefinition, 'report.pdf');
  };