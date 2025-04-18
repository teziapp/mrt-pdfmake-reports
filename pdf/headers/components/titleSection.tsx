import { HeaderData } from '../../../example/src/data/pdfContent';

// Function to get the title and header data section
export const getTitleSection = (title: string, headerData: HeaderData) => {
  return {
    stack: [
      { text: title, alignment: 'right', fontSize: 10, margin: [0, 20, 5, 2] },
      { text: '', margin: [0, 60, 0, 0] },
      { text: `Total: ${headerData.totalAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
      { text: `As on: ${headerData.currentDate}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
      { text: `Total Outstanding Amt.: ${headerData.outstandingAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] }
    ]
  };
}; 