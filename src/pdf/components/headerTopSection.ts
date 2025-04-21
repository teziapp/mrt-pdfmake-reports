import { Content, Style } from "pdfmake/interfaces";

// Function to get the godName section
export const headerTopSection = (data: Content[], customStyle?: Style) => {
  // Default headerTop style
  const defaultStyle: Style = {
    alignment: 'center',
    color: 'red',
    fontSize: 8,
    bold: true,
    margin: [0, 2, 0, 10]
  };

  return {
    // text: text,
    stack: data,
    style: customStyle || defaultStyle
  };
}; 