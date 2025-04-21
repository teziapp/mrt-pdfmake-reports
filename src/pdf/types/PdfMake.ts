import { HeaderRightStrings } from "../../example/src/data/pdfContent";
import { headerTemplates } from "../headers/getHeaderDefinition";

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