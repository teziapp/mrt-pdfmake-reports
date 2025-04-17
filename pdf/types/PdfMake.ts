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
  template: string;
  title: string;
  showHeader: boolean;
  companyDetails: CompanyDetails;
  showLogo?: boolean;
  headerOnEveryPage?: boolean;
  content?: any[];
} 