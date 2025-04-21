import { Content, Style } from 'pdfmake/interfaces';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerRightStrings: Content[], customStyle?: Style) => {
  const defaultStyle: Style = {
    alignment: 'right',
    fontSize: 10,
    bold: true,
    margin: [0, 10, 10, 10]
  };
  
  // Return a properly structured stack of content
  return {
    stack: headerRightStrings,
    style: customStyle || defaultStyle
  };
}; 