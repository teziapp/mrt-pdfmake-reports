// playground requires you to assign document definition to a variable called dd
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderRegularPdfMake } from './headers/headerRegularPdfMake';
import { HeaderSettings } from './types/PdfMake';
pdfMake.vfs = pdfFonts.vfs;

export const generatePDF = async (headerSettings: HeaderSettings) => {
  const { 
    template = 'regular', 
    title, 
    showHeader = true, 
    companyDetails,
    showLogo = true,
    headerOnEveryPage = false,
    content
  } = headerSettings;

  // Initialize document definition
  let docDefinition: any = {
    content,
    pageMargins: [40, showHeader ? 150 : 40, 40, 40] as [number, number, number, number], // [left, top, right, bottom]
  };

  // Add header if needed
  if (showHeader) {
    let headerTemplate;
    
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
