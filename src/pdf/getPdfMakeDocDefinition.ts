import { Content, TDocumentDefinitions, ImageDefinition } from 'pdfmake/interfaces';
import { getHeaderDefinition } from './headers/getHeaderDefinition.ts';
import { HeaderSettings } from './types/PdfMake.ts';

export const getPdfMakeDocDefinition = async (
  inputDocDefinition: Omit<TDocumentDefinitions, 'header'>,
  headerSettings?: HeaderSettings
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
    };
    const existingContent = Array.isArray(docDefinition.content)
      ? docDefinition.content
      : docDefinition.content
      ? [docDefinition.content]
      : [];
    docDefinition.content = [
      content as Content,
      { text: '', margin: [0, 10, 0, 0] } as Content,
      ...existingContent,
    ];
  }

  return docDefinition;
};