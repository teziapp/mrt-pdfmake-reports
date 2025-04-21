import { Content, Style } from 'pdfmake/interfaces';

// Function to get the content section of the header
export const getheaderContent = (content: Content[], customStyle?: Style) => {
  const defaultStyle: Style = {
    alignment: 'left', 
    margin: [0, 20, 0, 5], 
    fontSize: 14, 
    bold: false 
  };
  
  return {
    stack: content,
    style: customStyle || defaultStyle
  };
}; 