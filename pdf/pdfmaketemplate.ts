// playground requires you to assign document definition to a variable called dd
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { HeaderRegularPdfMake } from './headers/headerRegularPdfMake';
pdfMake.vfs = pdfFonts.vfs;

const header = await HeaderRegularPdfMake({ title: 'Sample Title' });
const docDefinition = {
    header: header.header,
    pageMargins: [40, 150, 40, 40] as [number, number, number, number], // [left, top, right, bottom]
    content: [
        { text: 'First paragraph'},
        { text: 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines' }
    ],
};

export const generatePDF = () => {
    pdfMake.createPdf(docDefinition).open();
};
