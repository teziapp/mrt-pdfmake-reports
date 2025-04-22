import { Content, Style } from 'pdfmake/interfaces';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerRightStrings: Content[], customStyle?: Style) => {
  
  return {
    stack: headerRightStrings,
    style: customStyle,
    margin: [0, 10, 10, 10]
  };
}; 