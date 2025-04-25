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
  
  // Right strings layout configuration
  const rightLayout = {
    leftColSpan: data.rightStringsLayout?.leftColSpan || Math.ceil(totalColumns * 0.6),
    rightColSpan: data.rightStringsLayout?.rightColSpan || Math.floor(totalColumns * 0.4)
  };

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

  // Create right strings rows - each string gets its own row aligned to the right
  const rightStringsRows = data.rightStrings.map(item => [[
    { text: '', colSpan: rightLayout.leftColSpan, border: [true, false, false, false] },
    ...Array(rightLayout.leftColSpan - 1).fill({}),
    { ...item, colSpan: rightLayout.rightColSpan, alignment: 'right', border: [false, false, true, false] },
    ...Array(rightLayout.rightColSpan - 1).fill({})
  ]]).flat();

  // Create supplier info row with colspan
  const supplierRow = [[
    { ...data.supplierInfo, colSpan: totalColumns },
    ...emptyColumns
  ]];

  // Convert totals to rows with proper colspan
  const totalsRows = data.totals.map(item => [
    { ...item, border: [true, false, true, false], alignment: 'left', colSpan: totalColumns },
    ...emptyColumns
  ]);

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
