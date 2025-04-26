import { Content, TDocumentDefinitions, ImageDefinition } from 'pdfmake/interfaces';
import { getHeaderDefinition } from './headers/getHeaderDefinition';
import { HeaderSettings } from './types/PdfMake';
import { generatePrimaryTable, TableData } from './outstanding/primaryTable';

export const getPdfMakeDocDefinition = async (
  inputDocDefinition: Omit<TDocumentDefinitions, 'header'>,
  headerSettings?: HeaderSettings,
  tableData?: TableData[]
) => {
  let docDefinition: TDocumentDefinitions = {
    pageMargins: [20, 10, 20, 20],
    ...inputDocDefinition,
  };

  if (headerSettings) {
    // Get header images and styles
    const { images, styles } = await getHeaderDefinition(headerSettings);
    
    // Add images to document definition
    docDefinition.images = {
      ...(docDefinition.images || {}),
      ...(images as Record<string, string | ImageDefinition>),
    };
    
    // Add styles to document definition
    docDefinition.styles = {
      ...(docDefinition.styles || {}),
      ...styles,
      ledgerTitle: {
        alignment: 'center',
        bold: true,
        fontSize: 14,
      },
      ledgerSubtitle: {
        alignment: 'center',
        bold: true,
        fontSize: 10
      },
      ledgerRightStrings: {
        alignment: 'right',
        fontSize: 8,
      },
      supplierRightStrings: {
        alignment: 'right',
        fontSize: 8,
        fillColor: '#eeeeee'
      },
      ledgerTotals: {
        alignment: 'left',
        fontSize: 8
      },
      ledgerCell: {
        fontSize: 8,
        alignment: 'left',
        margin: [0, 2, 0, 2]
      },
      ledgerHeader: {
        fontSize: 10,
        bold: true,
        alignment: 'center',
        fillColor: '#eeeeee',
        margin: [0, 2, 0, 2],
      },
      tableCellSummable:{
        alignment: 'right',
        fontSize: 8,
        margin: [0, 2, 0, 2]
      }
    };
    
    // Get existing content as array
    const existingContent = Array.isArray(docDefinition.content)
      ? docDefinition.content
      : docDefinition.content
      ? [docDefinition.content]
      : [];
    
    // Create an array for content
    const contentArray: Content[] = [];
    
    // Add primary table with repeating header if data is provided
    if (tableData && tableData.length > 0) {
      // Always include the header content on at least the first page
      const { content: headerContent } = await getHeaderDefinition(headerSettings);
      
      // Generate the table with repeating headers only if headerOnEveryPage is true
      const table = await generatePrimaryTable({ 
        data: tableData,
        headerSettings,
        includePageHeader: headerSettings.headerOnEveryPage ?? false
      });
      
      // If header should not repeat on every page, add it separately before the table
      if (!headerSettings.headerOnEveryPage) {
        contentArray.push(
          headerContent as Content,
          { text: '', margin: [0, 10, 0, 0] } as Content
        );
      }
      
      contentArray.push(table);
    } else {
      // If no table data, add the header content separately
      const { content } = await getHeaderDefinition(headerSettings);
      contentArray.push(
        content as Content,
        { text: '', margin: [0, 10, 0, 0] } as Content
      );
    }
    
    // Add the existing content
    contentArray.push(...existingContent);
    
    docDefinition.content = contentArray;
  }

  return docDefinition;
};