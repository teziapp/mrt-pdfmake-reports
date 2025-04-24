import { Content, Table, TableCell } from "pdfmake/interfaces";

// Define interface for the data structure used in staticpdfContent.ts
export interface LedgerItem {
  text: string;
  color?: string;
  style?: string;
}

export interface TableData {
  title: TableCell;
  subtitle: TableCell;
  rightStrings: LedgerItem[];
  totals: LedgerItem[];
}

// Function to create a ledger table using pdfmake's Table type
export const createLedgerTable = (data: TableData): Content => ({
  table: {
    widths: ['*'],
    body: [
      // Title Row
      [{
        text: data.title,
      }],
      // Subtitle Row
      [{
        text: data.subtitle,
        fontSize: 8,
        border: [true, false, true, false]
      }],
      // Right Strings Row
      [{
        stack: data.rightStrings.map(item => ({
          text: item.text,
          color: item.color || 'black',
          style: item.style || 'headerRightStrings'
        })),
        fontSize: 8,
        border: [true, false, true, false]
      }],
      // Totals Row
      [{
        stack: data.totals.map(item => ({
         text: item.text,
        })),
        fontSize: 8,
        border: [true, false, true, true]
      }]
    ]
  } as Table
});

// Wrapper function to maintain compatibility with existing code
export const createLedgerTableContent = (data: TableData): Content => {
  return createLedgerTable(data);
};