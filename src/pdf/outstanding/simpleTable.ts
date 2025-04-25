import { Content, Table, TableCell, TableLayout } from 'pdfmake/interfaces';

export interface TableOptions {
  headerRows?: number;
  widths?: string[] | number[];
  layout?: TableLayout;
}

export const createTable = (
  headers: Content[],
  rows: Content[][],
  options: TableOptions = {}
): Content => {
  const tableBody: TableCell[][] = [
    headers,
    ...rows
  ];

  const table: Table = {
    body: tableBody,
    headerRows: options.headerRows ?? 1,
    ...(options.widths && { widths: options.widths }),
  };

  return {
    table,
    ...(options.layout && { layout: options.layout })
  };
};
