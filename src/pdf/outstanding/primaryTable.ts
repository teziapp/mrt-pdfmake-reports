import { ContentTable, ContentText, TableCellProperties, Content } from 'pdfmake/interfaces';

export interface TableData {
  title?: ContentText & TableCellProperties;
  subtitle?: ContentText & TableCellProperties;
  rightStrings: ContentText[];
  totals?: ContentText[];
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
  data: TableData[];
}

export const generatePrimaryTable = ({ data }: TableConfig): ContentTable => {
  // Determine total columns from headers or provided columnCount
  const totalColumns = data[0].columnCount || data[0].headers.length;
  const emptyColumns = Array(totalColumns - 1).fill({});
  
  // Initialize table body with proper type
  const tableBody: Content[][] = [];
  
  // Process each supplier's data
  data.forEach((supplierData, index) => {
    // Only add title and subtitle for first supplier
    if (index === 0 && supplierData.title?.text) {
      // Add title row
      tableBody.push([
        { ...supplierData.title, colSpan: totalColumns },
        ...emptyColumns
      ]);

      // Add subtitle row if exists
      if (supplierData.subtitle?.text) {
        tableBody.push([
          { ...supplierData.subtitle, colSpan: totalColumns },
          ...emptyColumns
        ]);

        // Add subtitle level totals and right strings if available
        if (supplierData.subtitleTotals?.length || supplierData.subtitleRightStrings?.length) {
          const maxSubtitleRows = Math.max(
            supplierData.subtitleTotals?.length || 0,
            supplierData.subtitleRightStrings?.length || 0
          );

          for (let i = 0; i < maxSubtitleRows; i++) {
            const totalItem = supplierData.subtitleTotals && i < supplierData.subtitleTotals.length 
              ? supplierData.subtitleTotals[i] 
              : { text: '', border: [true, false, true, false] };
              
            const rightString = supplierData.subtitleRightStrings && i < supplierData.subtitleRightStrings.length 
              ? supplierData.subtitleRightStrings[i] 
              : { text: '', border: [true, false, true, false] };

            tableBody.push([
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
      }
    }

    // Add supplier info and right strings section
    tableBody.push([
      { 
        text: supplierData.supplierInfo.text,
        style: supplierData.supplierInfo.style,
        border: [true, true, false, true],
        alignment: 'left',
        colSpan: Math.ceil(totalColumns / 2)
      },
      ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
      {
        stack: supplierData.rightStrings,
        style: 'ledgerRightStrings',
        border: [false, true, true, true],
        width: '*',
        alignment: 'right',
        colSpan: Math.floor(totalColumns / 2)
      },
      ...Array(Math.floor(totalColumns / 2) - 1).fill({})
    ]);

    // Add headers only for first supplier
    if (index === 0) {
      tableBody.push(supplierData.headers);
    }

    // Add rows
    tableBody.push(...supplierData.rows);
  });

  // Generate equal widths for all columns
  const columnWidth = '*';
  const widths = Array(totalColumns).fill(columnWidth);

  return {
    table: {
      widths,
      body: tableBody
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
