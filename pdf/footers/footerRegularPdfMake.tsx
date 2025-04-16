import pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// // Directly assign the vfs property
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

interface PdfData {
    type: string;
    pdfSettings: any;
    headerRightStrings: string[];
    sessionOgCompany: any;
    userData: any;
    grouping: string[];
    columnDef: string;
    nonGroupColumns: string[];
    filteredData: any[];
    lists: any;
    godName: string;
}

export function generatePdfMakeDocument(data: PdfData) {
    const {
        type,
        pdfSettings,
        headerRightStrings,
        sessionOgCompany,
        userData,
        grouping,
        columnDef,
        nonGroupColumns,
        filteredData,
        lists,
        godName,
    } = data;

    const documentDefinition = {
        content: [
            {
                text: type,
                style: 'header'
            },
            // Add more content here based on the existing logic
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center' as const
            },
            // Define more styles here
        }
    };

    pdfMake.createPdf(documentDefinition).open();
}

export const FooterRegularPdfMake = (currentPage: number, pageCount: number) => {
  
  return {
    table: {
      widths: ['30%', '40%', '30%'],
      body: [
        [
          {text: `Printed by: ${new Date().toLocaleString()}`, margin: [28, 10, 0, 0], style: 'footer'},
          {text: `Page ${currentPage} of ${pageCount}`, margin: [0, 10, 0, 0], style: 'footer'},
          {text: 'Powered by Smart Agent', link: 'https://smartagent.one', margin: [0, 10, 30, 0], color: 'blue', style: 'footer', decoration: 'underline'}
        ]
      ]
    },
    layout: 'noBorders'
  };
};

export default FooterRegularPdfMake;