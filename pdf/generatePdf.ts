import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake.vfs as any) = pdfFonts.vfs;

export const openPdf = (docDefinition: TDocumentDefinitions) => pdfMake.createPdf(docDefinition).open();

export const downloadPdf = (docDefinition: TDocumentDefinitions, filename: string = 'document.pdf') => pdfMake.createPdf(docDefinition).download(filename);