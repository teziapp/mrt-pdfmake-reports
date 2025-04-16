// playground requires you to assign document definition to a variable called dd
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;


const documentDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
};

export const generatePDF = () => {
    pdfMake.createPdf(documentDefinition).open();
};
