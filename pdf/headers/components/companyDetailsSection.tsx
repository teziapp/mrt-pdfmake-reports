import { CompanyDetails } from '../../types/PdfMake';

// Define types for customizable styles and layout
interface TextStyle {
  alignment?: 'left' | 'center' | 'right';
  fontSize?: number;
  bold?: boolean;
  color?: string;
  margin?: [number, number, number, number];
}

interface CompanyDetailsLayout {
  godNameStyle?: TextStyle;
  nameStyle?: TextStyle;
  addressStyle?: TextStyle;
  phoneStyle?: TextStyle;
  websiteStyle?: TextStyle;
  gstStyle?: TextStyle;
}

// Default styles
const defaultLayout: CompanyDetailsLayout = {
  godNameStyle: { alignment: 'center', margin: [50, 5, 0, 5], fontSize: 10, bold: true, color: 'red' },
  nameStyle: { alignment: 'left', margin: [0, 20, 0, 5], fontSize: 14, bold: true },
  addressStyle: { alignment: 'left', fontSize: 8 },
  phoneStyle: { alignment: 'left', margin: [0, 2, 0, 0], fontSize: 8 },
  websiteStyle: { alignment: 'left', fontSize: 8, margin: [0, 2, 0, 0] },
  gstStyle: { alignment: 'left', fontSize: 8, margin: [0, 2, 0, 0] }
};

// Function to get the company details section of the header
export const getCompanyDetailsSection = (company: CompanyDetails, customLayout: Partial<CompanyDetailsLayout> = {}) => {
  // Merge default layout with custom layout
  const layout = { ...defaultLayout, ...customLayout };
  // Use provided god name or fall back to default
  const godName = company.godName || '';
  return {
    stack: [
      { text: godName, ...layout.godNameStyle },
      { text: company.name, ...layout.nameStyle },
      { text: company.address, ...layout.addressStyle },
      { text: company.phoneNumber ? `ph:${company.phoneNumber}` : '', ...layout.phoneStyle },
      { text: 'Website: ' + company.website, ...layout.websiteStyle },
      { text: 'GSTIN: ' + company.gstNumber, ...layout.gstStyle }
    ]
  };
}; 