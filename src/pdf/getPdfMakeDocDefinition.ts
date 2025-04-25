import { Content, TDocumentDefinitions, ImageDefinition } from 'pdfmake/interfaces';
import { getHeaderDefinition } from './headers/getHeaderDefinition.ts';
import { HeaderSettings } from './types/PdfMake.ts';
import { generatePrimaryTable, TableData } from './outstanding/primaryTable.ts';

export const getPdfMakeDocDefinition = async (
  inputDocDefinition: Omit<TDocumentDefinitions, 'header'>,
  headerSettings?: HeaderSettings,
  tableData?: TableData
) => {
  let docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 20, 40, 40],
    ...inputDocDefinition,
  };

  if (headerSettings) {
    const { content, images, styles } = await getHeaderDefinition(headerSettings);
    
    docDefinition.images = {
      ...(docDefinition.images || {}),
      ...(images as Record<string, string | ImageDefinition>),
    };
    
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
        alignment: 'left',
        margin: [0, 2, 0, 2]
      }
    };
    const existingContent = Array.isArray(docDefinition.content)
      ? docDefinition.content
      : docDefinition.content
      ? [docDefinition.content]
      : [];
    
    // Create an array of content with header, table (if provided), and existing content
    const contentArray: Content[] = [
      content as Content,
      { text: '', margin: [0, 10, 0, 0] } as Content,
    ];
    
    // Add primary table if data is provided
    if (tableData) {
      const table = generatePrimaryTable({ 
        data: tableData,
      });
      
      contentArray.push(table);
      contentArray.push({ text: '', margin: [0, 10, 0, 0] } as Content);
    }
    
    // Add the existing content
    contentArray.push(...existingContent);
    
    docDefinition.content = contentArray;
  }

  return docDefinition;
};