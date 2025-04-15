import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';

// Initialize pdfmake with fonts
pdfMake.vfs = pdfFonts.vfs;

interface Column {
  header: string;
  accessorKey: string;
}

export const generatePDF = (data: any[], columns: Column[], title: string = 'Table Export') => {
  // Create table body starting with headers
  const tableBody = [
    columns.map(column => ({
      text: column.header,
      style: 'tableHeader'
    }))
  ];

  // Add data rows
  data.forEach(row => {
    const dataRow = columns.map(column => ({
      text: row[column.accessorKey]?.toString() ?? '',
      style: 'tableCell'
    }));
    tableBody.push(dataRow);
  });

  // Define the document definition
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: title,
        style: 'header',
        margin: [0, 0, 0, 10]
      } as Content,
      {
        table: {
          headerRows: 1,
          widths: Array(columns.length).fill('*'),
          body: tableBody,
        }
      } as Content
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black',
        fillColor: '#f3f3f3',
        alignment: 'center'
      },
      tableCell: {
        fontSize: 10,
        margin: [0, 5, 0, 5]
      }
    },
    pageOrientation: 'portrait',
    pageMargins: [40, 40, 40, 40],
  };

  // Generate and download PDF
  pdfMake.createPdf(docDefinition).download(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
}; 