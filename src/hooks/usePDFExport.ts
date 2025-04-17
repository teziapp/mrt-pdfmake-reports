import { useCallback } from 'react';
import { PDFExportConfig, PDFExportOptions } from '@/types/export';
import { SmartTableColumn, TableState } from '@/types/table';

interface UsePDFExportOptions {
  enabled: boolean;
  options?: PDFExportOptions;
}

interface ExportToPDFParams<TData extends Record<string, any>> {
  data: TData[];
  columns: SmartTableColumn<TData>[];
  state: TableState<TData>;
}

export function usePDFExport<TData extends Record<string, any>>({
  enabled,
  options,
}: UsePDFExportOptions) {
  const exportToPDF = useCallback(
    async ({ data, columns, state }: ExportToPDFParams<TData>) => {
      if (!enabled) return;

      try {
        // Dynamically import pdfmake to reduce initial bundle size
        const pdfMake = (await import('pdfmake/build/pdfmake')).default;
        const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        // Apply sorting and filtering
        let processedData = [...data];
        if (state.sorting.length > 0) {
          processedData = processedData.sort((a, b) => {
            for (const sort of state.sorting) {
              const aValue = a[sort.id];
              const bValue = b[sort.id];
              if (aValue < bValue) return sort.desc ? 1 : -1;
              if (aValue > bValue) return sort.desc ? -1 : 1;
            }
            return 0;
          });
        }

        // Filter visible columns
        const visibleColumns = columns.filter(
          (col) => state.columnVisibility[col.accessorKey as keyof TData] !== false
        );

        // Create document definition
        const docDefinition: PDFExportConfig<TData>['documentDefinition'] = {
          content: [
            // Title
            {
              text: options?.title || 'Table Export',
              style: 'header',
              margin: [0, 0, 0, 10],
            },
            // Table
            {
              table: {
                headerRows: 1,
                widths: visibleColumns.map(() => '*'),
                body: [
                  // Header row
                  visibleColumns.map((column) => ({
                    text: column.header,
                    style: 'tableHeader',
                  })),
                  // Data rows
                  ...processedData.map((row) =>
                    visibleColumns.map((column) => {
                      const value = row[column.accessorKey as keyof TData];
                      return column.pdfRenderer
                        ? column.pdfRenderer(row)
                        : String(value);
                    })
                  ),
                ],
              },
            },
          ],
          defaultStyle: {
            font: 'Roboto',
          },
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            tableHeader: {
              bold: true,
              fillColor: '#f5f5f5',
            },
            ...options?.styles,
          },
          pageOrientation: options?.orientation || 'portrait',
          pageSize: options?.pageSize || 'A4',
        };

        // Generate and download PDF
        pdfMake.createPdf(docDefinition).download('table-export.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    },
    [enabled, options]
  );

  return {
    exportToPDF,
  };
} 