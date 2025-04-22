import { Content } from 'pdfmake/interfaces';

// Function to get the content section of the header
export const getheaderContent = (content: Content[]) => {
  
  return {
    stack: content,
  };
}; 