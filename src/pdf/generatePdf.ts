import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

export const openPdf = (docDefinition: TDocumentDefinitions) => pdfMake.createPdf(docDefinition).open();

export const downloadPdf = (docDefinition: TDocumentDefinitions, filename: 'document.pdf') => pdfMake.createPdf(docDefinition).download(filename);