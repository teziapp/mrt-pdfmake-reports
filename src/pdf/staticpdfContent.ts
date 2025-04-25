import type { Content, ImageDefinition } from 'pdfmake/interfaces';
import { HeaderSettings } from './types/PdfMake';
import { TableData } from './outstanding/primaryTable';

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

// Sample table data with styling
export const tableData: TableData = {
  title: {
    text: "OUTSTANDING", 
    style: 'ledgerTitle',
    border: [true, true, true, true],
    alignment: 'center'
  },
  subtitle: {
    text: "AALFA TEXTILE", 
    style: 'ledgerSubtitle',
    border: [true, true, true, false],
    alignment: 'center'
  },
  rightStrings: [
    { text: "> 60 days    : -24,801.00", style: 'ledgerRightStrings' },
    { text: "> 230 days   : 1,62,84,284.06", style: 'ledgerRightStrings' },
    { text: "> 200 days   : 7,27,125.00", style: 'ledgerRightStrings' },
    { text: "> 130 days   : 21,11,500.00", style: 'ledgerRightStrings' }
  ],
  totals: [
    { text: "Inv. Amt. : 3,07,51,251.00", style: 'ledgerCell' },
    { text: "Out. Amt. : 1,89,93,158.06", style: 'ledgerCell' },
    { text: "GR : -15,300.00", style: 'ledgerCell' }
  ],
  headers: [
    { text: "Inv. Dt.", style: 'ledgerHeader' },
    { text: "Inv. No.", style: 'ledgerHeader' },
    { text: "Inv. Amt.", style: 'ledgerHeader' },
    { text: "Out. Amt.", style: 'ledgerHeader' },
    { text: "GR", style: 'ledgerHeader' },
    { text: "Cheque. Amt.", style: 'ledgerHeader' },
    { text: "Recived. Amt.", style: 'ledgerHeader' },
    { text: "Dr/Cr", style: 'ledgerHeader' },
    { text: "Days", style: 'ledgerHeader' }
  ],
  rows: [
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ],
    [
      { text: "22-02-25", style: 'ledgerCell' },
      { text: "ON ACCOUNT", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "-5,000.00", style: 'ledgerCell' },
      { text: "0.00", style: 'ledgerCell' },
      { text: "1,00,000.00", style: 'ledgerCell' },
      { text: "-1,05,000.00", style: 'ledgerCell' },
      { text: "54", style: 'ledgerCell' }
    ]
  ],
  supplierInfo: {
    text: "Supplier: AARADHANA TRADING CO",
    style: 'ledgerHeader',
    border: [true, true, true, true]
  }
};

export const headerSettings: HeaderSettings = {
  template: 'regular',
  headerContent,
  headerOnEveryPage: true,
  headerRightStrings: headerRightStrings
};

// Sample PDF content sections - keeping it empty since table is added in getPdfMakeDocDefinition
export const sampleContent: Content = [];
