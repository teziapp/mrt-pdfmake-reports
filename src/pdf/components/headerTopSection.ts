import { Content, Style } from "pdfmake/interfaces";

// Function to get the godName section
export const headerTopSection = (data: Content[], customStyle?: Style) => {
  return {
    stack: data,
    style: customStyle
  };
};