import { ContentText, TableCellProperties, Content, TableLayout, Style, CustomTableLayout, TableCell } from 'pdfmake/interfaces';
import { HeaderSettings } from '../types/PdfMake';
import { getHeaderDefinition } from '../headers/getHeaderDefinition';

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

export interface TableConfig {
  data: TableData[];
  headerSettings?: HeaderSettings;
  tableLayout?: TableLayout | CustomTableLayout;
  borders?: {
    useBorderColor?: boolean;
    outerBorderWidth?: number;
    innerBorderWidth?: number;
    outerBorderColor?: string;
    innerBorderColor?: string;
  };
}

export const generatePrimaryTable = async ({ 
  data, 
  headerSettings, 
  tableLayout,
  borders = {
    useBorderColor: true,
    outerBorderWidth: 1.3,
    innerBorderWidth: 0.5,
    outerBorderColor: '#000000',
    innerBorderColor: '#aaaaaa'
  }
}: TableConfig): Promise<Content> => {
  // Determine total columns from headers or provided columnCount
  const totalColumns = data[0].columnCount || data[0].headers.length;
  const emptyColumns = Array(totalColumns - 1).fill({});
  
  // Create one unified table with all content
  const tableBody: TableCell[][] = [];
  let headerRowsCount = 0;
  
  // Add page header rows if requested
  if (headerSettings && headerSettings.headerOnEveryPage) {
    headerRowsCount = await addHeaderRows(tableBody, headerSettings, totalColumns, emptyColumns);
  }
  
  // Non-repeating title/subtitle section (outside of headerRows)
  const nonRepeatingRows = headerRowsCount;
  
  // Add title and subtitle section for the first supplier
  if (data[0].title?.text || data[0].subtitle?.text) {
    addTitleSubtitleRows(tableBody, data[0], totalColumns, emptyColumns);
  }
  
  // Track indices of special rows for border styling
  const specialRowIndices: number[] = []; 
  
  // Process all suppliers data
  processSupplierData(tableBody, data, totalColumns, specialRowIndices);
  
  // Generate equal widths for all columns
  const widths = Array(totalColumns).fill('*');

  // Create a single unified table with all content
  return {
    table: {
      headerRows: headerSettings?.headerOnEveryPage ? headerRowsCount : 0,
      widths,
      body: tableBody,
      dontBreakRows: true,
    },
    layout: tableLayout || createTableLayout(nonRepeatingRows, headerRowsCount, specialRowIndices, data, borders)
  };
};

// Helper function to add header rows
async function addHeaderRows(
  tableBody: TableCell[][],
  headerSettings: HeaderSettings,
  totalColumns: number,
  emptyColumns: TableCell[]
): Promise<number> {
  let headerRowsCount = 0;
  
  // Get header definition from the template
  const headerDef = await getHeaderDefinition(headerSettings);
  
  // Add top section if it exists
  if (headerSettings.headerContent.topSection) {
    tableBody.push([
      { 
        stack: headerSettings.headerContent.topSection,
        colSpan: totalColumns,
        style: 'headerTopSection',
        border: [false, false, false, false],
        margin: [0, 0, 0, 0]
      },
      ...emptyColumns
    ]);
    headerRowsCount++;
  }

  // Extract the main header content from headerDef
  const headerTable = headerDef.content.find(item => 
    (item).table?.widths?.length
  ) as { table: { body: any[][] } };

  if (headerTable) {
    // Add header content row with logo, content and right strings
    tableBody.push([
      {
        colSpan: totalColumns,
        table: {
          widths: ['20%', '40%', '40%'],
          body: headerTable.table.body
        },
        layout: 'noBorders',
        border: [false, false, false, false],
      },
      ...emptyColumns
    ]);
    headerRowsCount++;
  }
  
  // Add header separator line
  tableBody.push([
    {
      colSpan: totalColumns,
      table: {
        widths: ['*'],
        body: [['']],
      },
      layout: {
        hLineWidth: function(i) {
          return (i === 1) ? 2 : 0;
        },
        vLineWidth: function() { return 0; },
      },
      border: [false, false, false, false],
      margin: [0, 0, 0, 5]
    },
    ...emptyColumns
  ]);
  headerRowsCount++;

  return headerRowsCount;
}

// Helper function to add title and subtitle section
function addTitleSubtitleRows(
  tableBody: TableCell[][],
  data: TableData,
  totalColumns: number,
  emptyColumns: TableCell[]
): void {
  // Add title if exists
  if (data.title?.text) {
    tableBody.push([
      { 
        ...data.title, 
        colSpan: totalColumns,
        borderColor: ['#000000', '#000000', '#000000', '#000000'] 
      },
      ...emptyColumns
    ]);
  }

  // Add subtitle if exists
  if (data.subtitle?.text) {
    tableBody.push([
      { 
        ...data.subtitle, 
        colSpan: totalColumns,
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        border: data.subtitleTotals?.length || data.subtitleRightStrings?.length 
          ? [true, true, true, false] // No bottom border if there are totals/rightStrings
          : [true, true, true, true]
      },
      ...emptyColumns
    ]);
    
    // Handle subtitle level totals and right strings
    addSubtitleDetailsRows(tableBody, data, totalColumns);
  }
}

// Helper function to add subtitle details (totals and right strings)
function addSubtitleDetailsRows(
  tableBody: TableCell[][],
  data: TableData,
  totalColumns: number
): void {
  if (!data.subtitleTotals?.length && !data.subtitleRightStrings?.length) return;
  
  const maxSubtitleRows = Math.max(
    data.subtitleTotals?.length || 0,
    data.subtitleRightStrings?.length || 0
  );

  const leftColSpan = data.rightStringsLayout?.leftColSpan || Math.ceil(totalColumns / 2);
  const rightColSpan = data.rightStringsLayout?.rightColSpan || Math.floor(totalColumns / 2);
  
  for (let i = 0; i < maxSubtitleRows; i++) {
    const isLastRow = i === maxSubtitleRows - 1;
    
    const totalItem = data.subtitleTotals && i < data.subtitleTotals.length 
      ? data.subtitleTotals[i] 
      : { text: '', border: [true, false, true, false] };
      
    const rightString = data.subtitleRightStrings && i < data.subtitleRightStrings.length 
      ? data.subtitleRightStrings[i] 
      : { text: '', border: [true, false, true, false] };

    const leftCells = Array(leftColSpan - 1).fill({});
    const rightCells = Array(rightColSpan - 1).fill({});

    tableBody.push([
      { 
        ...totalItem, 
        colSpan: leftColSpan,
        border: [true, false, false, isLastRow ? true : false],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        style: 'ledgerTotals'
      },
      ...leftCells,
      { 
        ...rightString, 
        colSpan: rightColSpan,
        alignment: 'right',
        border: [false, false, true, isLastRow ? true : false],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        style: 'ledgerRightStrings'
      },
      ...rightCells
    ]);
  }
}

// Helper function to process supplier data
function processSupplierData(
  tableBody: TableCell[][],
  data: TableData[],
  totalColumns: number,
  specialRowIndices: number[]
): void {
  data.forEach((supplierData, dataIndex) => {
    const leftColSpan = supplierData.rightStringsLayout?.leftColSpan || Math.ceil(totalColumns / 2);
    const rightColSpan = supplierData.rightStringsLayout?.rightColSpan || Math.floor(totalColumns / 2);
    
    // Mark supplier info row as special
    specialRowIndices.push(tableBody.length); // Supplier row
    
    const leftCells = Array(leftColSpan - 1).fill({});
    const rightCells = Array(rightColSpan - 1).fill({});
    
    // Add supplier info and right strings
    tableBody.push([
      { 
        text: supplierData.supplierInfo.text,
        style: supplierData.supplierInfo.style || 'ledgerHeader',
        border: [true, true, false, true],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        alignment: 'left',
        colSpan: leftColSpan
      },
      ...leftCells,
      {
        stack: supplierData.rightStrings,
        style: 'supplierRightStrings',
        border: [false, true, true, true],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        width: '*',
        alignment: 'right',
        colSpan: rightColSpan
      },
      ...rightCells
    ]);

    // Add headers only for first supplier - with black borders
    if (dataIndex === 0) {
      specialRowIndices.push(tableBody.length); // Headers row
      tableBody.push(supplierData.headers.map(header => ({
        ...header,
        style: header.style,
        border: [true, true, true, true],
        borderColor: ['#000000', '#000000', '#000000', '#000000']
      })));
    }

    // Add rows
    const rowStartIndex = tableBody.length;
    tableBody.push(...supplierData.rows.map((row, rowIndex) => {
      // Check if this is a total row
      const isTotal = row.some(c => (c as any).text === "Total" && (c as any).bold === true);
      
      if (isTotal) {
        // Mark total rows as special
        specialRowIndices.push(rowStartIndex + rowIndex);
      }
      
      return row.map((cell, cellIndex) => {
        // Check if leftmost or rightmost cell
        const isLeftmost = cellIndex === 0;
        const isRightmost = cellIndex === row.length - 1;
        
        // For total rows, use black borders on left/right and top/bottom, but grey for internal borders
        if (isTotal) {
          return {
            ...cell,
            style: cell.style || 'ledgerCell',
            border: [true, true, true, true],
            borderColor: [
              isLeftmost ? '#000000' : '#aaaaaa', // Left border
              '#000000',                          // Top border (keep black)
              isRightmost ? '#000000' : '#aaaaaa', // Right border
              '#000000'                           // Bottom border (keep black)
            ]
          };
        }
        
        // For regular rows, show only vertical borders with grey color
        // But make leftmost and rightmost borders black
        return {
          ...cell,
          style: cell.style || 'ledgerCell',
          border: [true, false, true, false],
          borderColor: [
            isLeftmost ? '#000000' : '#aaaaaa', // Left border
            '#aaaaaa',                          // Top border
            isRightmost ? '#000000' : '#aaaaaa', // Right border
            '#aaaaaa'                           // Bottom border
          ]
        };
      });
    }));
  });
}

// Create dynamic table layout
function createTableLayout(
  nonRepeatingRows: number,
  headerRowsCount: number,
  specialRowIndices: number[],
  data: TableData[],
  borders: TableConfig['borders']
): CustomTableLayout {
  return {
    defaultBorder: false,
    hLineWidth: function(i, node) {
      // Top and bottom of table
      if (i === 0 || i === node.table.body.length) return borders?.outerBorderWidth || 1.3;
      
      // Headers section
      if (i <= nonRepeatingRows + headerRowsCount) return borders?.outerBorderWidth || 1.3;
      
      // Special rows
      if (specialRowIndices.includes(i) || specialRowIndices.includes(i-1)) {
        return borders?.outerBorderWidth || 1.3;
      }

      // Force border between title/subtitle section and supplier section
      if (i === nonRepeatingRows + (data[0].title ? 1 : 0) + 
              (data[0].subtitle ? 1 : 0) + 
              (data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length || 0)) {
        return borders?.outerBorderWidth || 1.3;
      }
      
      return 0; // No horizontal lines between regular rows
    },
    vLineWidth: function(i, node) {
      // Outer borders are full width
      if (i === 0 || (node.table.widths && i === node.table.widths.length)) {
        return borders?.outerBorderWidth || 1.3;
      }
      
      // For internal lines, use thinner lines
      return borders?.innerBorderWidth || 0.5;
    },
    hLineColor: function(i, node) {
      // Top and bottom borders of the entire table
      if (i === 0 || i === node.table.body.length) {
        return borders?.outerBorderColor || '#000000';
      }
      
      // Special rows get black horizontal borders
      if (specialRowIndices.includes(i) || specialRowIndices.includes(i-1)) {
        return borders?.outerBorderColor || '#000000';
      }

      // Force black border between title/subtitle section and supplier section
      if (i === nonRepeatingRows + (data[0].title ? 1 : 0) + 
              (data[0].subtitle ? 1 : 0) + 
              (data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length || 0)) {
        return borders?.outerBorderColor || '#000000';
      }
      
      return null;
    },
    vLineColor: function(i, node) {
      // Outer borders are black
      if (i === 0 || (node.table.widths && i === node.table.widths.length)) {
        return borders?.outerBorderColor || '#000000';
      }
      
      return borders?.innerBorderColor || '#aaaaaa'; // Grey for all internal vertical lines
    },
    paddingLeft: () => 4,
    paddingRight: () => 4
  };
}
