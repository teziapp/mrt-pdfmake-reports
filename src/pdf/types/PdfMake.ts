import { Content } from "pdfmake/interfaces";
import { headerTemplates } from "../headers/getHeaderDefinition";

export interface HeaderContent {
  image?: string;
  content: Content[];
  topSection?: Content[];
}

export interface PdfHeader {
  table: {
    widths: string[] | number[];
    body: any[][];
    headerRows?: number;
  };
  layout: string;
}

export interface HeaderImage {
  [key: string]: string;
}

export interface HeaderSettings {
  template: keyof typeof headerTemplates;
  headerContent: HeaderContent;
  headerOnEveryPage?: boolean;
  headerRightStrings?: Content[];
} 