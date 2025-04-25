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
export const tableData: TableData[] = [{
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
      alignment: 'center',
      bold: true
    },
    subtitleTotals: [
      { text: "Total Inv. : 5,07,51,251.00", style: 'ledgerTotals', alignment: 'left' },
      { text: "Total Out. : 2,89,93,158.06", style: 'ledgerTotals', alignment: 'left' },
    ],
    subtitleRightStrings: [
      { text: "> 90 days : 25,456.00", style: 'ledgerRightStrings' },
      { text: "> 60 days : 15,456.00", style: 'ledgerRightStrings' }
    ],
    supplierInfo: {
      text: "Supplier: AARADHANA TRADING CO",
      style: 'ledgerHeader',
      border: [true, true, true, true]
    },
    rightStrings: [
      { text: "> 60 days : -12,456.00", style: 'ledgerRightStrings', color: 'red' },
      { text: "> 30 days : -12,456.00", style: 'ledgerRightStrings', color: 'green' }
    ],
    totals: [
      { text: "Inv. Amt. : 3,07,51,251.00", style: 'ledgerTotals', alignment: 'left' },
      { text: "Out. Amt. : 1,89,93,158.06", style: 'ledgerTotals', alignment: 'left' },
      { text: "GR : -15,300.00", style: 'ledgerTotals', alignment: 'left' },
    ],
    headers: [
      { text: "Date", style: 'ledgerHeader' },
      { text: "Particulars", style: 'ledgerHeader' },
      { text: "Debit", style: 'ledgerHeader' },
      { text: "Credit", style: 'ledgerHeader' },
      { text: "GR", style: 'ledgerHeader' },
      { text: "Cheque", style: 'ledgerHeader' },
      { text: "Received", style: 'ledgerHeader' },
      { text: "Balance", style: 'ledgerHeader' },
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
        { text: "", style: 'ledgerCell' },
        { text: "Total", style: 'ledgerCell', bold: true },
        { text: "0.00", style: 'ledgerCell', bold: true },
        { text: "-1,05,000.00", style: 'ledgerCell', bold: true },
        { text: "-5,000.00", style: 'ledgerCell', bold: true },
        { text: "0.00", style: 'ledgerCell', bold: true },
        { text: "1,00,000.00", style: 'ledgerCell', bold: true },
        { text: "-1,05,000.00", style: 'ledgerCell', bold: true },
        { text: "", style: 'ledgerCell' }
      ]
    ]
  },
  {
    supplierInfo: {
      text: "Supplier: ARROW FASHION",
      style: 'ledgerHeader',
      border: [true, true, true, true]
    },
    rightStrings: [
      { text: "> 30 days : -12,456.00", style: 'ledgerRightStrings' }
    ],
    headers: [
      { text: "Date", style: 'ledgerHeader' },
      { text: "Particulars", style: 'ledgerHeader' },
      { text: "Debit", style: 'ledgerHeader' },
      { text: "Credit", style: 'ledgerHeader' },
      { text: "GR", style: 'ledgerHeader' },
      { text: "Cheque", style: 'ledgerHeader' },
      { text: "Received", style: 'ledgerHeader' },
      { text: "Balance", style: 'ledgerHeader' },
      { text: "Days", style: 'ledgerHeader' }
    ],
    rows: [
      [
        { text: "11-12-24", style: 'ledgerCell' },
        { text: "ON ACCOUNT", style: 'ledgerCell' },
        { text: "0.00", style: 'ledgerCell' },
        { text: "-12,456.00", style: 'ledgerCell' },
        { text: "0.00", style: 'ledgerCell' },
        { text: "12,456.00", style: 'ledgerCell' },
        { text: "12,456.00", style: 'ledgerCell' },
        { text: "0.00", style: 'ledgerCell' },
        { text: "127", style: 'ledgerCell' }
      ],
      [
        { text: "", style: 'ledgerCell' },
        { text: "Total", style: 'ledgerCell', bold: true },
        { text: "0.00", style: 'ledgerCell', bold: true },
        { text: "-12,456.00", style: 'ledgerCell', bold: true },
        { text: "0.00", style: 'ledgerCell', bold: true },
        { text: "12,456.00", style: 'ledgerCell', bold: true },
        { text: "12,456.00", style: 'ledgerCell', bold: true },
        { text: "0.00", style: 'ledgerCell', bold: true },
        { text: "", style: 'ledgerCell' }
      ]
    ]
}];

export const headerSettings: HeaderSettings = {
  template: 'regular',
  headerContent,
  headerOnEveryPage: false,
  headerRightStrings: headerRightStrings
};

// Sample PDF content sections - keeping it empty since table is added in getPdfMakeDocDefinition
export const sampleContent: Content = [];
