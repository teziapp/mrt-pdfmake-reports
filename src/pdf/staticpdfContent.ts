import type { Content } from 'pdfmake/interfaces';
// import type { CompanyDetails } from '../../../pdf/types/PdfMake';
// import { HeaderRightStrings } from "../../example/src/data/pdfContent";
import { headerTemplates } from "./headers/getHeaderDefinition";

export interface PdfHeader {
  table: {
    widths: string[] | number[];
    body: any[][];
    headerRows?: number;
  };
  layout: string;
}

export interface CompanyDetails {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  gstNumber: string;
  logoImage?: string;
  godName?: string;
}

export interface HeaderSettings {
  template: keyof typeof headerTemplates;
  companyDetails: CompanyDetails;
  headerOnEveryPage?: boolean;
  headerRightStrings?: HeaderRightStrings;
} 

export interface HeaderRightStrings {
  currentDate?: string;
  totalAmount?: string;
  outstandingAmount?: string;
}

// Default company details
export const defaultCompanyDetails: CompanyDetails = {
  name: 'Sample Company Name',
  address: '123 Business Street, City, State, ZIP',
  phoneNumber: '+1 234-567-8900',
  website: 'www.samplecompany.com',
  gstNumber: 'GST123456789',
  logoImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQOq_KQn9qYIzTMHclBSe1zQcH3CMxPVBUw&s',
  godName: '** !! Shree Ganeshay Namah !! **',
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

// Default PDF settings
export const defaultPdfSettings = {
  template: 'regular' as const,
  title: 'Sample PDF Report',
  showHeader: true,
  showLogo: false,
  headerOnEveryPage: true,
  headerRightStrings: {
    currentDate: new Date().toLocaleDateString('en-IN'),
    totalAmount: '0.00',
    outstandingAmount: '0.00'
  } as HeaderRightStrings
}; 

export const headerData: HeaderRightStrings = {
  currentDate: new Date().toLocaleDateString('en-IN'),
  totalAmount: '0.00',
  outstandingAmount: '0.00'
} as HeaderRightStrings