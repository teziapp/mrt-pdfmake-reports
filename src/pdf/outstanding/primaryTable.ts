import { ContentTable, ContentText, TableCellProperties } from 'pdfmake/interfaces';

export interface TableItem extends ContentText {
  color?: string;
}

export interface TableData {
  title: ContentText & TableCellProperties;
  subtitle: ContentText & TableCellProperties;
  rightStrings: TableItem[];
  totals: TableItem[];
}

interface TableConfig {
  data: TableData;
}

export const generatePrimaryTable = ({ data }: TableConfig): ContentTable => {
  // Create the title row with colspan
  const titleRow = [[
    { ...data.title, colSpan: 2 },
    {}  // Empty cell for colSpan
  ]];

  // Create the subtitle row with colspan
  const subtitleRow = [[
    { ...data.subtitle, colSpan: 2 },
    {}  // Empty cell for colSpan
  ]];

  // Convert right strings to rows
  const rightStringsRows = data.rightStrings.map(item => [
    { text: '', border: [true, false, false, false] },  // Empty cell on the left
    { ...item, border: [false, false, true, false] }    // Right string on the right
  ]);

  // Convert totals to rows
  const totalsRows = data.totals.map(item => [
      { ...item, border: [true, false, false, false], alignment: 'left' },    // Total on the right
      { text: '', border: [false, false, true, false] },  // Empty cell on the left
  ]);

  // Last row should have bottom border
  if (totalsRows.length > 0) {
    totalsRows[totalsRows.length - 1][0].border = [true, false, false, true];
    totalsRows[totalsRows.length - 1][1].border = [false, false, true, true];
  }

  return {
    table: {
      headerRows: 2,  // Title and subtitle are headers
      widths: ['*', '*'],
      body: [
        ...titleRow,
        ...subtitleRow,
        ...rightStringsRows,
        ...totalsRows
      ]
    },
    layout: {
      defaultBorder: true,
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => 2,
      paddingBottom: () => 2
    }
  };
};
