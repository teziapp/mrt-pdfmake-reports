import type { Content, ImageDefinition } from 'pdfmake/interfaces';
import { HeaderSettings } from './types/PdfMake';
import { TableData } from './outstanding/primaryTable';

// Custom type for rightStrings and totals items
export interface LedgerItem {
  label: string;
  value: string;
  color?: string;
  style?: string;
}

// Company details content array
const companyDetailsContent: Content[] = [
  { text: 'Sample Company Name', style: 'headerContent'},
  { text: '123 Business Street, City, State, ZIP', style: 'headerContent' },
  { text: 'ph:+1 234-567-8900', style: 'headerContent' },
  { text: 'www.samplecompany.com', style: 'headerContent' },
  { text: 'GSTIN: GST123456789', style: 'headerContent' }
];

// Default company details
const defaultHeaderImage: ImageDefinition = {
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQOq_KQn9qYIzTMHclBSe1zQcH3CMxPVBUw&s'
};

const defaultHeaderTopSection: Content[] = [
  { text: '** !! Shree Ganeshay Namah !! **', style: 'headerTopSection'},
];

// Default header right strings
export const headerRightStrings: Content[] = [
  { text: `Date: ${new Date().toLocaleDateString('en-IN')}`, style: 'headerRightStrings' },
  { text: 'Total Amount: 0.00', style: 'headerRightStrings' },
  { text: 'Outstanding: 0.00', style: 'headerRightStrings' }
];

// Convert company details to proper format with image and top section
const headerContent = {
  image: defaultHeaderImage,
  topSection: defaultHeaderTopSection,
  content: companyDetailsContent
};

// Sample table data
export const tableData: TableData = {
  title: {text: "OUTSTANDING", style: 'ledgerTitle', border: [true, true, true, true]},
  subtitle: {text: "AALFA TEXTILE", style: 'ledgerSubtitle', border: [true, true, true, false]},
  rightStrings: [
    { text: "> 60 days : -24,801.00", style: 'ledgerRightStrings' },
    { text: "> 230 days : 1,62,84,284.06", style: 'ledgerRightStrings' },
    { text: "> 200 days : 7,27,125.00", style: 'ledgerRightStrings' },
    { text: "> 130 days : 21,11,500.00", style: 'ledgerRightStrings' }
  ],
  totals: [
    { text: "Inv. Amt. : 3,07,51,251.00", style: 'ledgerRightStrings' },
    { text: "Out. Amt. : 1,89,93,158.06", style: 'ledgerRightStrings' },
    { text: "GR : -15,300.00", style: 'ledgerRightStrings' }
  ]
};

export const headerSettings: HeaderSettings = {
  template: 'regular',
  headerContent,
  headerOnEveryPage: true,
  headerRightStrings: headerRightStrings
};

// Sample PDF content sections
export const sampleContent: Content = [
  { text: 'Sample Report Content', style: 'header' },
  {
    text: 'This is a dynamically generated PDF with custom header settings.',
    margin: [0, 20, 0, 20],
    color: 'red'
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