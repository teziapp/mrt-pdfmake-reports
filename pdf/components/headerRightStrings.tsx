import { HeaderRightStrings } from '../../example/src/data/pdfContent';

// Function to get the title and header data section
export const headerRightStringsRegular = (headerData: HeaderRightStrings) => {
  return {
    stack: [
      { text: '', margin: [0, 60, 0, 0] },
      { text: `Total: ${headerData.totalAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
      { text: `As on: ${headerData.currentDate}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] },
      { text: `Total Outstanding Amt.: ${headerData.outstandingAmount}`, alignment: 'right', fontSize: 8, margin: [0, 0, 5, 2] }
    ]
  };
}; 