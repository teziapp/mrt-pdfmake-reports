import { Content, Style } from 'pdfmake/interfaces';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerRightStrings: Content[], customStyle?: Style) => {
  const defaultStyle: Style = {
    alignment: 'right',
    fontSize: 8,
    bold: true,
    margin: [0, 0, 5, 2]
  };
  
  // Return a properly structured stack of content
  return {
    stack: headerRightStrings,
    style: customStyle || defaultStyle
  };
}; 