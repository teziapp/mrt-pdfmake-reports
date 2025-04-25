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
    {}
  ]];

  // Create the subtitle row with colspan
  const subtitleRow = [[
    { ...data.subtitle, colSpan: 2 },
    {}
  ]];

  // Convert right strings to rows
  const rightStringsRows = data.rightStrings.map(item => [
    { text: '', border: [true, false, false, false] },
    { ...item, border: [false, false, true, false] }
  ]);

  // Convert totals to rows
  const totalsRows = data.totals.map(item => [
    { ...item, border: [true, false, false, false], alignment: 'left' },
    { text: '', border: [false, false, true, false] }
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
