import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeaderDefinition } from './headers/getHeaderDefinition.ts';
import { HeaderSettings } from './types/PdfMake.ts';

export const getPdfMakeDocDefinition = async (
  inputDocDefinition: Omit<TDocumentDefinitions, 'header'>,
  headerSettings?: HeaderSettings
) => {

  // Initialize document definition
  let docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 20, 40, 40], // Adjusted top margin to accommodate header in content
    ...inputDocDefinition
  }

  if(headerSettings) {
    const { content, image, styles } = await getHeaderDefinition(headerSettings);
    
    // Add images if present
    docDefinition.images = {
      ...(docDefinition.images || {}),
      ...image
    };

    // Merge styles from header definition with existing styles
    docDefinition.styles = {
      ...(docDefinition.styles || {}),
      ...styles
    };

    // Add header content to the beginning of the document content
    const existingContent = Array.isArray(docDefinition.content) 
      ? docDefinition.content 
      : (docDefinition.content ? [docDefinition.content] : []);

    docDefinition.content = [
      content as Content,
      { text: '', margin: [0, 10, 0, 0] } as Content,
      ...existingContent
    ];
  }

  return docDefinition;
};
