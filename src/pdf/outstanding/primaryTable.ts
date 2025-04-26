import { ContentTable, ContentText, TableCellProperties, Content } from 'pdfmake/interfaces';
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
  includePageHeader?: boolean;
}

export const generatePrimaryTable = async ({ data, headerSettings, includePageHeader = false }: TableConfig): Promise<ContentTable> => {
  // Determine total columns from headers or provided columnCount
  const totalColumns = data[0].columnCount || data[0].headers.length;
  const emptyColumns = Array(totalColumns - 1).fill({});
  
  // Initialize table body with proper type
  const tableBody: Content[][] = [];
  let headerRowsCount = 0;
  
  // Add page header rows if requested
  if (includePageHeader && headerSettings) {
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
          border: [false, false, false, false]
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
        layout: 'headerLineOnly',
        border: [false, false, false, false],
      },
      ...emptyColumns
    ]);
    headerRowsCount++;
  }
  
  // Process each supplier's data
  data.forEach((supplierData, index) => {
    // Only add title and subtitle for first supplier
    if (index === 0 && supplierData.title?.text) {
      // Add title row
      tableBody.push([
        { ...supplierData.title, colSpan: totalColumns },
        ...emptyColumns
      ]);
      headerRowsCount++;

      // Add subtitle row if exists
      if (supplierData.subtitle?.text) {
        tableBody.push([
          { ...supplierData.subtitle, colSpan: totalColumns },
          ...emptyColumns
        ]);
        headerRowsCount++;

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
                border: [true, false, false, false],
                style: 'ledgerTotals'
              },
              ...Array(Math.ceil(totalColumns / 2) - 1).fill({}),
              { 
                ...rightString, 
                colSpan: Math.floor(totalColumns / 2),
                alignment: 'right',
                border: [false, false, true, false],
                style: 'ledgerRightStrings'
              },
              ...Array(Math.floor(totalColumns / 2) - 1).fill({})
            ]);
            headerRowsCount++;
          }
        }
      }
    }

    // Add supplier info and right strings section
    tableBody.push([
      { 
        text: supplierData.supplierInfo.text,
        style: supplierData.supplierInfo.style || 'ledgerHeader',
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
    headerRowsCount++;

    // Add headers only for first supplier
    if (index === 0) {
      tableBody.push(supplierData.headers.map(header => ({
        ...header,
        style: header.style || 'ledgerHeader'
      })));
      headerRowsCount++;
    }

    // Add rows
    tableBody.push(...supplierData.rows.map(row => 
      row.map(cell => ({
        ...cell,
        style: cell.style || 'ledgerCell'
      }))
    ));
  });

  // Generate equal widths for all columns
  const columnWidth = '*';
  const widths = Array(totalColumns).fill(columnWidth);

  return {
    table: {
      headerRows: headerRowsCount,
      widths,
      body: tableBody
    },
    layout: {
      defaultBorder: true,
      hLineWidth: function(i) {
        // Remove top border of the table (i=0)
        if (i === 0) return 0;
        return 1;
      },
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => 2,
      paddingBottom: () => 2
    }
  };
};
