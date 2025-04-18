import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { HeaderRegularPdfMake } from './headers/headerRegularPdfMake.tsx';
import { HeaderSettings } from './types/PdfMake';
(pdfMake.vfs as any) = pdfFonts.vfs;

// Custom document definition that extends the pdfmake type
interface CustomDocumentDefinition extends TDocumentDefinitions {
  showHeader?: boolean;
}

export const generatePDF = async (headerSettings: HeaderSettings) => {
  const { 
    template = 'regular', 
    title, 
    showHeader = true, 
    companyDetails,
    showLogo = true,
    headerOnEveryPage = false,
    content = [] // Default to empty array if content is undefined
  } = headerSettings;

  // Initialize document definition
  let docDefinition: CustomDocumentDefinition = {
    content,
    showHeader,
    pageMargins: [40, showHeader ? 150 : 20, 40, 40] as [number, number, number, number], // [left, top, right, bottom]
  };

  // Add header if needed
  if (showHeader) {
    
    // Select the appropriate header template based on the template option
    switch(template) {
      case 'regular':
      default:
        const headerResult = await HeaderRegularPdfMake({ 
          title,
          companyDetails,
          showLogo
        });
        
        docDefinition.header = headerOnEveryPage ? headerResult.header : function(currentPage: number) {
          return currentPage === 1 ? headerResult.header : null;
        };
        
        docDefinition.images = headerResult.images;
        break;
    }
  }

  // Generate and open the PDF
  pdfMake.createPdf(docDefinition).open();
};
