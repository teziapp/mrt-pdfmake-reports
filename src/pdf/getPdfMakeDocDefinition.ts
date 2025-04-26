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
    pageMargins: [40, 20, 40, 40],
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
        margin: [0, 2, 0, 2]
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
      const table = await generatePrimaryTable({ 
        data: tableData,
        headerSettings,
        includePageHeader: true
      });
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