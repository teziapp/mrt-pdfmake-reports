import { ContentTable, ContentText, TableCellProperties } from 'pdfmake/interfaces';

export interface TableData {
  title: ContentText & TableCellProperties;
  subtitle: ContentText & TableCellProperties;
  rightStrings: ContentText[];
  totals: ContentText[];
  subtitleRightStrings?: ContentText[];
  subtitleTotals?: ContentText[];
  headers: ContentText[];
  rows: ContentText[][];
  supplierInfo: ContentText & TableCellProperties;
  columnCount?: number; 
  rightStringsLayout?: { 
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

  // Create subtitle section with right strings and totals if available
  const subtitleSection = [];
  
  // Add subtitle row
  subtitleSection.push([
    { ...data.subtitle, colSpan: totalColumns },
    ...emptyColumns
  ]);

  // Add subtitle level totals and right strings if available
  if (data.subtitleTotals?.length || data.subtitleRightStrings?.length) {
    const maxSubtitleRows = Math.max(
      data.subtitleTotals?.length || 0,
      data.subtitleRightStrings?.length || 0
    );

    for (let i = 0; i < maxSubtitleRows; i++) {
      const totalItem = data.subtitleTotals && i < data.subtitleTotals.length 
        ? data.subtitleTotals[i] 
        : { text: '', border: [true, false, true, false] };
        
      const rightString = data.subtitleRightStrings && i < data.subtitleRightStrings.length 
        ? data.subtitleRightStrings[i] 
        : { text: '', border: [true, false, true, false] };

      subtitleSection.push([
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
  }

  // Create supplier and right strings section
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
      headerRows: 4 + (data.subtitleTotals?.length || data.subtitleRightStrings?.length || 0),
      widths,
      body: [
        ...titleRow,
        ...subtitleSection,
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
