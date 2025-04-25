import { ContentTable, ContentText, TableCellProperties } from 'pdfmake/interfaces';

export interface TableData {
  title: ContentText & TableCellProperties;
  subtitle: ContentText & TableCellProperties;
  rightStrings: ContentText[];
  totals: ContentText[];
  headers: ContentText[];
  rows: ContentText[][];
  supplierInfo: ContentText & TableCellProperties;
}

interface TableConfig {
  data: TableData;
}

export const generatePrimaryTable = ({ data }: TableConfig): ContentTable => {
  // Create the title row with colspan
  const titleRow = [[
    { ...data.title, colSpan: 9 },
    {}, {}, {}, {}, {}, {}, {}, {}
  ]];

  // Create the subtitle row with colspan
  const subtitleRow = [[
    { ...data.subtitle, colSpan: 9 },
    {}, {}, {}, {}, {}, {}, {}, {}
  ]];

  // Create supplier info row with colspan
  const supplierRow = [[
    { ...data.supplierInfo, colSpan: 9 },
    {}, {}, {}, {}, {}, {}, {}, {}
  ]];

  // Convert right strings to rows with proper colspan
  const rightStringsRows = data.rightStrings.map(item => [
    { text: '', border: [true, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { ...item, border: [false, false, true, false] }
  ]);

  // Convert totals to rows with proper colspan
  const totalsRows = data.totals.map(item => [
    { ...item, border: [true, false, true, false], alignment: 'left', colSpan: 9 },
    {}, {}, {}, {}, {}, {}, {}, {}
  ]);

  // Create header row
  const headerRow = [data.headers];

  // Last row should have bottom border
  if (data.rows.length > 0) {
    data.rows[data.rows.length - 1] = data.rows[data.rows.length - 1].map((cell) => ({
      ...cell,
      border: [true, true, true,true]
    }));
  }

  return {
    table: {
      headerRows: 4, // Title, subtitle, supplier info, and actual headers
      widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: [
        ...titleRow,
        ...subtitleRow,
        ...rightStringsRows,
        ...totalsRows,
        ...supplierRow,
        ...headerRow,
        ...data.rows,
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
