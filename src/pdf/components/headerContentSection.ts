import { Content, Style } from 'pdfmake/interfaces';

// Function to get the content section of the header
export const getheaderContent = (content: Content[], customStyle?: Style) => {
  
  return {
    stack: content,
    style: customStyle
  };
}; 