import { ContentText, TableCellProperties, Content } from 'pdfmake/interfaces';
import { HeaderSettings } from '../types/PdfMake';
import { checkImageValidGetDef } from '../utils/fetchValidImageURL';

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
  headerSettings?: HeaderSettings;
}

export const generatePrimaryTable = async ({ data, headerSettings }: TableConfig): Promise<Content> => {
  // Determine total columns from headers or provided columnCount
  const totalColumns = data[0].columnCount || data[0].headers.length;
  const emptyColumns = Array(totalColumns - 1).fill({});
  
  // Instead of separate tables, create one unified table with all content
  const tableBody: Content[][] = [];
  let headerRowsCount = 0;
  
  // Add page header rows if requested and should be on every page
  if (headerSettings && headerSettings.headerOnEveryPage) {
    // Get validated logo image if available
    const logoSection = headerSettings.headerContent.image
      ? await checkImageValidGetDef({
          url: headerSettings.headerContent.image.url,
          ...(headerSettings.headerContent.image.headers && { headers: headerSettings.headerContent.image.headers }),
        })
      : undefined;
    
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
    
    // Add header content row with logo, content and right strings
    tableBody.push([
      {
        colSpan: totalColumns,
        table: {
          widths: ['20%', '40%', '40%'],
          body: [[
            logoSection?.imageDef && logoSection.image 
              ? { image: 'headerLogo', fit: [100, 100], style: 'headerImage' }
              : { text: '' },
            headerSettings.headerContent.content ? { stack: headerSettings.headerContent.content, style: 'headerContent' } : { text: '' },
            headerSettings.headerRightStrings ? { stack: headerSettings.headerRightStrings, style: 'headerRightStrings' } : { text: '' },
          ]],
        },
        layout: 'noBorders',
        border: [false, false, false, false],
      },
      ...emptyColumns
    ]);
    headerRowsCount++;
    
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
    // headerRowsCount++;
  }
  
  // Non-repeating title/subtitle section (outside of headerRows)
  const nonRepeatingRows = headerRowsCount;
  
  // Add title and subtitle section
  if (data[0].title?.text) {
    tableBody.push([
      { 
        ...data[0].title, 
        colSpan: totalColumns,
        borderColor: ['#000000', '#000000', '#000000', '#000000'] 
      },
      ...emptyColumns
    ]);
  }

  if (data[0].subtitle?.text) {
    tableBody.push([
      { 
        ...data[0].subtitle, 
        colSpan: totalColumns,
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        border: data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length 
          ? [true, true, true, false] // No bottom border if there are totals/rightStrings
          : [true, true, true, true]
      },
      ...emptyColumns
    ]);
    
    // Handle subtitle level totals and right strings
    if (data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length) {
      const maxSubtitleRows = Math.max(
        data[0].subtitleTotals?.length || 0,
        data[0].subtitleRightStrings?.length || 0
      );

      for (let i = 0; i < maxSubtitleRows; i++) {
        const isLastRow = i === maxSubtitleRows - 1;
        
        const totalItem = data[0].subtitleTotals && i < data[0].subtitleTotals.length 
          ? data[0].subtitleTotals[i] 
          : { text: '', border: [true, false, true, false] };
          
        const rightString = data[0].subtitleRightStrings && i < data[0].subtitleRightStrings.length 
          ? data[0].subtitleRightStrings[i] 
          : { text: '', border: [true, false, true, false] };

        tableBody.push([
          { 
            ...totalItem, 
            colSpan: Math.ceil(totalColumns / 2),
            border: [true, false, false, isLastRow ? true : false],
            borderColor: ['#000000', '#000000', '#000000', '#000000'],
            style: 'ledgerTotals'
          },
          ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
          { 
            ...rightString, 
            colSpan: Math.floor(totalColumns / 2),
            alignment: 'right',
            border: [false, false, true, isLastRow ? true : false],
            borderColor: ['#000000', '#000000', '#000000', '#000000'],
            style: 'ledgerRightStrings'
          },
          ...Array(Math.floor(totalColumns / 2) - 1).fill({})
        ]);
      }
    }
  }
  
  // Track indices of special rows for border styling
  const specialRowIndices: number[] = []; 
  
  // Process data starting from the first entry
  data.forEach((supplierData, dataIndex) => {
    // Mark supplier info row as special
    specialRowIndices.push(tableBody.length); // Supplier row
    tableBody.push([
      { 
        text: supplierData.supplierInfo.text,
        style: supplierData.supplierInfo.style || 'ledgerHeader',
        border: [true, true, false, true],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        alignment: 'left',
        colSpan: Math.ceil(totalColumns / 2)
      },
      ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
      {
        stack: supplierData.rightStrings,
        style: 'supplierRightStrings',
        border: [false, true, true, true],
        borderColor: ['#000000', '#000000', '#000000', '#000000'],
        width: '*',
        alignment: 'right',
        colSpan: Math.floor(totalColumns / 2)
      },
      ...Array(Math.floor(totalColumns / 2) - 1).fill({})
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
      headerRowsCount++;
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

  // Generate equal widths for all columns
  const columnWidth = '*';
  const widths = Array(totalColumns).fill(columnWidth);

  // Create a single unified table with all content
  return {
    table: {
      headerRows: headerSettings?.headerOnEveryPage ? headerRowsCount : 0,
      widths,
      body: tableBody,
      dontBreakRows: true,
    },
    layout: {
      defaultBorder: false,
      hLineWidth: function(i, node) {
        // Top and bottom of table
        if (i === 0 || i === node.table.body.length) return 1.3;
        
        // Headers section
        if (i <= nonRepeatingRows + headerRowsCount) return 1.3;
        
        // Special rows
        if (specialRowIndices.includes(i) || specialRowIndices.includes(i-1)) {
          return 1.3;
        }

        // Force border between title/subtitle section and supplier section
        if (i === nonRepeatingRows + (data[0].title ? 1 : 0) + 
                 (data[0].subtitle ? 1 : 0) + 
                 (data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length || 0)) {
          return 1.3;
        }
        
        return 0; // No horizontal lines between regular rows
      },
      vLineWidth: function(i, node) {
        // Outer borders are full width
        if (i === 0 || (node.table.widths && i === node.table.widths.length)) {
          return 1.3;
        }
        
        // For internal lines, use thinner lines to create visual distinction
        return 0.5;
      },
      hLineColor: function(i, node) {
        // Top and bottom borders of the entire table
        if (i === 0 || i === node.table.body.length) {
          return '#000000';
        }
        
        // Special rows get black horizontal borders
        if (specialRowIndices.includes(i) || specialRowIndices.includes(i-1)) {
          return '#000000';
        }

        // Force black border between title/subtitle section and supplier section
        if (i === nonRepeatingRows + (data[0].title ? 1 : 0) + 
                 (data[0].subtitle ? 1 : 0) + 
                 (data[0].subtitleTotals?.length || data[0].subtitleRightStrings?.length || 0)) {
          return '#000000';
        }
        
        return null;
      },
      vLineColor: function(i, node) {
        // Outer borders are black
        if (i === 0 || (node.table.widths && i === node.table.widths.length)) {
          return '#000000';
        }
        
        return '#aaaaaa'; // Grey for all internal vertical lines
      },
      paddingLeft: () => 4,
      paddingRight: () => 4
    }
  };
};
