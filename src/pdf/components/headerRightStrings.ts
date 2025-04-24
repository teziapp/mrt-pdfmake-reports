import { Content } from 'pdfmake/interfaces';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerRightStrings: Content[]) => {
  
  return {
    stack: headerRightStrings
  };
}; 