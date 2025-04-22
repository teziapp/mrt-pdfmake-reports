import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeaderDefinition } from './headers/getHeaderDefinition.ts';
import { HeaderSettings } from './types/PdfMake.ts';

export const getPdfMakeDocDefinition = async (
  inputDocDefinition: Omit<TDocumentDefinitions, 'header'>,
  headerSettings?: HeaderSettings
) => {

  // Initialize document definition
  let docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 20, 40, 40],
    ...inputDocDefinition
  }

  if(headerSettings) {
    const { header, image, styles } = await getHeaderDefinition(headerSettings);
    docDefinition.pageMargins = [40, 160, 40, 40];
    docDefinition.header = headerSettings.headerOnEveryPage 
      ? header as Content
      : function(currentPage: number) {
        return currentPage === 1 ? header as Content : null;
      };
    docDefinition.images = {
      ...(docDefinition.images || {}),
      ...image
    };
    // Merge styles from header definition with existing styles
    docDefinition.styles = {
      ...(docDefinition.styles || {}),
      ...styles
    };
  }

  return docDefinition;
};
