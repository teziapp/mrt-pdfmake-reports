import type { Content } from 'pdfmake/interfaces';
import { HeaderImage, HeaderSettings } from './types/PdfMake';

// Company details content array
const companyDetailsContent: Content[] = [
  { text: 'Sample Company Name', style: 'headerContent' },
  { text: '123 Business Street, City, State, ZIP', style: 'defaultStyle' },
  { text: 'ph:+1 234-567-8900', style: 'defaultStyle' },
  { text: 'www.samplecompany.com', style: 'defaultStyle' },
  { text: 'GSTIN: GST123456789', style: 'defaultStyle' }
];

// Default company details
const defaultHeaderImage: HeaderImage = {
  logoImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQOq_KQn9qYIzTMHclBSe1zQcH3CMxPVBUw&s',
  godName: '** !! Shree Ganeshay Namah !! **'
};

// Default header right strings
const headerRightStrings: Content[] = [
  { text: `Date: ${new Date().toLocaleDateString('en-IN')}`, style: 'headerRight' },
  { text: 'Total Amount: 0.00', style: 'headerRight' },
  { text: 'Outstanding: 0.00', style: 'headerRight' }
];

// Convert company details to proper format with image and top section
const headerContent = {
  image: defaultHeaderImage.logoImage,
  topSection: defaultHeaderImage.topSection,
  content: companyDetailsContent
};

// Default PDF settings including header settings
export const headerSettings: HeaderSettings = {
  template: 'regular',
  headerContent,
  headerOnEveryPage: true,
  headerRightStrings
};

// Sample PDF content sections
export const sampleContent: Content = [
  { text: 'Sample Report Content', style: 'header' },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
  },
];

// export const sampleContent: Content = [
//     {
//     //   layout: '', // optional
//       table: {
//         // headerRows: 1,
//         widths: [ '*', '*', '*'],

//         body: [
//             // Pdf Table Type Header
//             [
//                 {text: 'Outstanding', colSpan: 3, bold: true, style: 'tableHeader', alignment: 'center', fontSize: 14, border: [true, true, true, true]}
//             ],

//             // Ledger Name
//             [
//                 {text: 'Ledger Name', colSpan: 3, bold: true, alignment: 'center', fontSize: 14, border: [true, true, true, true]},
//             ],
//             ]
//       }
//     }
//   ];