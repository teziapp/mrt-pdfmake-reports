import { ContentTable, ContentText, TableCellProperties } from 'pdfmake/interfaces';

export interface TableData {
  title: ContentText & TableCellProperties;
  subtitle: ContentText & TableCellProperties;
  rightStrings: ContentText[];
  totals: ContentText[];
  headers: ContentText[];
  rows: ContentText[][];
  supplierInfo: ContentText & TableCellProperties;
  columnCount?: number; // Optional column count, defaults to headers length
  rightStringsLayout?: { // Optional layout configuration for right strings
    leftColSpan?: number;
    rightColSpan?: number;
  };
}

interface TableConfig {
  data: TableData;
}

export const generatePrimaryTable = ({ data }: TableConfig): ContentTable => {
  // Determine total columns from headers or provided columnCount
  const totalColumns = data.columnCount || data.headers.length;
  const emptyColumns = Array(totalColumns - 1).fill({});
  
  // Create the title row with colspan
  const titleRow = [[
    { ...data.title, colSpan: totalColumns },
    ...emptyColumns
  ]];

  // Create the subtitle row with colspan
  const subtitleRow = [[
    { ...data.subtitle, colSpan: totalColumns },
    ...emptyColumns
  ]];

  // Create supplier info and right strings row with two columns
  const supplierAndRightStrings = [[
    { 
      text: data.supplierInfo.text,
      style: data.supplierInfo.style,
      border: [true, true, false, true],
      alignment: 'left',
      colSpan: Math.ceil(totalColumns / 2)
    },
    ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
    {
      stack: data.rightStrings,
      style: 'ledgerRightStrings',
      border: [false, true, true, true],
      width: '*',
      alignment: 'right',
      colSpan: Math.floor(totalColumns / 2)
    },
    ...Array(Math.floor(totalColumns / 2) - 1).fill({})
  ]];

  // Create header row
  const headerRow = [data.headers];

  // Last row should have bottom border
  if (data.rows.length > 0) {
    data.rows[data.rows.length - 1] = data.rows[data.rows.length - 1].map((cell) => ({
      ...cell,
      border: [true, true, true, true]
    }));
  }

  // Generate equal widths for all columns
  const columnWidth = '*';
  const widths = Array(totalColumns).fill(columnWidth);

  return {
    table: {
      headerRows: 4,
      widths,
      body: [
        ...titleRow,
        ...subtitleRow,
        ...supplierAndRightStrings,
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
