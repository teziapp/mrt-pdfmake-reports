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

  // Create supplier info row with colspan
  const supplierRow = [[
    { ...data.supplierInfo, colSpan: totalColumns },
    ...emptyColumns
  ]];

  // Combine totals and right strings in a two-column layout
  const totalsAndRightStrings = [];
  const maxRows = Math.max(data.totals.length, data.rightStrings.length);
  
  for (let i = 0; i < maxRows; i++) {
    const totalItem = i < data.totals.length ? data.totals[i] : { text: '', border: [true, false, true, false] };
    const rightString = i < data.rightStrings.length ? data.rightStrings[i] : { text: '', border: [true, false, true, false] };
    
    totalsAndRightStrings.push([
      { 
        ...totalItem, 
        colSpan: Math.ceil(totalColumns / 2),
        border: [true, false, false, false]
      },
      ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
      { 
        ...rightString, 
        colSpan: Math.floor(totalColumns / 2),
        alignment: 'right',
        border: [false, false, true, false]
      },
      ...Array(Math.floor(totalColumns / 2) - 1).fill({})
    ]);
  }

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
  const columnWidth = 50;
  const widths = Array(totalColumns).fill(columnWidth);

  return {
    table: {
      headerRows: 4,
      widths,
      body: [
        ...titleRow,
        ...subtitleRow,
        ...totalsAndRightStrings,
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
