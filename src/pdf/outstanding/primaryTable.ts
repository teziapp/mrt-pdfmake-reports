import { ContentTable, ContentText, Style, TableCellProperties } from 'pdfmake/interfaces';

export interface TableItem extends ContentText {
  color?: string;
}

export interface TableData {
  title: ContentText & TableCellProperties;
  subtitle: ContentText & TableCellProperties;
  rightStrings: TableItem[];
  totals: TableItem[];
}

interface TableConfig {
  data: TableData;
  styles?: Record<string, Style>;
}

export const generatePrimaryTable = ({ data }: TableConfig): ContentTable => {
  const headerRow: Array<ContentText & TableCellProperties> = [
    data.title,
    data.subtitle
  ];

  const rightStringsRow: ContentText[] = data.rightStrings;
  const totalsRow: ContentText[] = data.totals;

  return {
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        headerRow,
        rightStringsRow,
        totalsRow
      ]
    },
    layout: {
      defaultBorder: true,
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => 2,
      paddingBottom: () => 2
    }
  };
};
