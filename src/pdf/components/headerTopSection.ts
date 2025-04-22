import { Content } from "pdfmake/interfaces";

// Function to get the godName section
export const headerTopSection = (data: Content[]) => {
  return {
    stack: data
  };
};