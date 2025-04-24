import { Content, ImageDefinition } from "pdfmake/interfaces";
import { headerTemplates } from "../headers/getHeaderDefinition";

export interface HeaderContent {
  image?: ImageDefinition;
  content: Content[];
  topSection?: Content[];
}

export interface PdfHeader {
  table: {
    widths: string[] | number[];
    headerRows?: number;
  };
  layout: string;
}

export interface HeaderImage {
  logoImage: ImageDefinition;
}

export interface HeaderSettings {
  template: keyof typeof headerTemplates;
  headerContent: HeaderContent;
  headerOnEveryPage?: boolean;
  headerRightStrings?: Content[];
} 