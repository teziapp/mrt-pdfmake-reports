import { Content, Style } from 'pdfmake/interfaces';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerRightStrings: Content[], customStyle?: Style) => {
  const defaultStyle: Style = {
    alignment: 'right',
    fontSize: 10,
    bold: false
  };
  
  // Apply margin to the container itself
  return {
    stack: headerRightStrings,
    style: customStyle || defaultStyle,
    margin: [0, 10, 10, 10]  // Moved margin to the top level
  };
}; 