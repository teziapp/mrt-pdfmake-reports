import type { Content } from 'pdfmake/interfaces';
import { CompanyDetails, HeaderRightStrings, HeaderSettings } from './types/PdfMake';

export interface PdfHeader {
  table: {
    widths: string[] | number[];
    body: any[][];
    headerRows?: number;
  };
  layout: string;
  companyDetails: CompanyDetails;
  headerOnEveryPage: boolean;
  headerRightStrings: HeaderRightStrings;
}

// Default company details
const defaultCompanyDetails: CompanyDetails = {
  name: 'Sample Company Name',
  address: '123 Business Street, City, State, ZIP',
  phoneNumber: '+1 234-567-8900',
  website: 'www.samplecompany.com',
  gstNumber: 'GST123456789',
  logoImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQOq_KQn9qYIzTMHclBSe1zQcH3CMxPVBUw&s',
  godName: '** !! Shree Ganeshay Namah !! **',
};

// Default header right strings
const defaultHeaderRightStrings: HeaderRightStrings = {
  currentDate: new Date().toLocaleDateString('en-IN'),
  totalAmount: '0.00',
  outstandingAmount: '0.00'
};

// Default PDF settings including header settings
export const headerSettings: HeaderSettings = {
  template: 'regular',
  companyDetails: defaultCompanyDetails,
  headerOnEveryPage: true,
  headerRightStrings: defaultHeaderRightStrings
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