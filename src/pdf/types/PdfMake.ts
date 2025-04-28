import { ContentText, TableCellProperties, TableLayout, CustomTableLayout, Content, ImageDefinition } from "pdfmake/interfaces";
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

export interface TableData {
  title?: ContentText & TableCellProperties;
  subtitle?: ContentText & TableCellProperties;
  rightStrings: ContentText[];
  totals?: ContentText[];
  subtitleRightStrings?: ContentText[];
  subtitleTotals?: ContentText[];
  headers: ContentText[];
  rows: ContentText[][];
  supplierInfo: ContentText & TableCellProperties;
  columnCount?: number; 
  rightStringsLayout?: { 
    leftColSpan?: number;
    rightColSpan?: number;
  };
}

export interface TableConfig {
  data: TableData[];
  headerSettings?: HeaderSettings;
  tableLayout?: TableLayout | CustomTableLayout;
  borders?: {
    useBorderColor?: boolean;
    outerBorderWidth?: number;
    innerBorderWidth?: number;
    outerBorderColor?: string;
    innerBorderColor?: string;
  };
} 