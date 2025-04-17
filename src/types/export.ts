import { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface PDFExportConfig<TData extends Record<string, any>> {
  /**
   * Document definition for pdfmake
   */
  documentDefinition: TDocumentDefinitions;
  
  /**
   * Data to be exported
   */
  data: TData[];
  
  /**
   * Columns to be exported
   */
  columns: PDFExportColumn<TData>[];
  
  /**
   * Custom header content
   */
  header?: PDFExportContent;
  
  /**
   * Custom footer content
   */
  footer?: PDFExportContent;
  
  /**
   * Custom styles
   */
  styles?: Record<string, any>;
}

export interface PDFExportColumn<TData> {
  /**
   * Column header
   */
  header: string;
  
  /**
   * Column accessor
   */
  accessor: keyof TData;
  
  /**
   * Custom cell renderer
   */
  render?: (row: TData) => any;
  
  /**
   * Column width
   */
  width?: number | string;
  
  /**
   * Column alignment
   */
  alignment?: 'left' | 'center' | 'right';
}

export type PDFExportContent = string | {
  text: string;
  alignment?: 'left' | 'center' | 'right';
  style?: string | string[];
  margin?: [number, number, number, number];
}; 