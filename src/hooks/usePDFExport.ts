import { useCallback } from 'react';
import { PDFExportConfig } from '@/types/export';
import { SmartTableColumn, TableState, PDFExportOptions } from '@/types/table';
import type { PageSize } from 'pdfmake/interfaces';

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
        
        // Set the virtual file system for fonts
        if (pdfMake.vfs === undefined) {
          pdfMake.vfs = {};
        }
        // Type assertion to access pdfMake property
        const fonts = pdfFonts as any;
        if (fonts && fonts.pdfMake && fonts.pdfMake.vfs) {
          pdfMake.vfs = fonts.pdfMake.vfs;
        }

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

        // Filter visible columns (respecting enablePDFExport flag)
        const visibleColumns = columns.filter(
          (col) => {
            const accessorKey = col.accessorKey as string;
            return state.columnVisibility[accessorKey] !== false && 
              col.enablePDFExport !== false;
          }
        );

        // Prepare the table body with headers and data rows
        const tableBody = [];
        
        // Add header row
        tableBody.push(
          visibleColumns.map((column) => ({
            text: column.header,
            style: 'tableHeader',
          }))
        );
        
        // Add data rows with alternating styles for better readability
        processedData.forEach((row, rowIndex) => {
          const rowData = visibleColumns.map((column) => {
            const accessorKey = column.accessorKey as string;
            const value = row[accessorKey];
            // Use custom renderer if provided, otherwise convert to string
            const cellContent = column.pdfRenderer
              ? column.pdfRenderer(row)
              : value !== undefined && value !== null
                ? String(value)
                : '';
                
            return {
              text: cellContent,
              style: rowIndex % 2 === 1 ? 'oddRow' : undefined,
            };
          });
          
          tableBody.push(rowData);
        });

        // Generate filename based on title or default
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${(options?.title || 'table-export').toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`;

        // Determine page size
        let pageSize: PageSize | undefined = undefined;
        if (options?.pageSize) {
          pageSize = options.pageSize as PageSize;
        } else {
          pageSize = 'A4';
        }

        // Create document definition
        const docDefinition: PDFExportConfig<TData>['documentDefinition'] = {
          content: [
            // Title with styling
            {
              text: options?.title || 'Table Export',
              style: 'header',
              margin: [0, 0, 0, 10],
            },
            // Add timestamp
            {
              text: `Generated: ${new Date().toLocaleString()}`,
              style: 'subheader',
              margin: [0, 0, 0, 20],
            },
            // Table with styling
            {
              table: {
                headerRows: 1,
                // Set column widths based on content
                widths: visibleColumns.map((col) => 
                  typeof col.size === 'number' ? col.size : '*'
                ),
                body: tableBody,
              },
              layout: {
                hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 2 : 1,
                vLineWidth: (i, node) => (i === 0 || i === node.table.widths!.length) ? 2 : 1,
                hLineColor: (i) => (i === 0 || i === 1) ? '#5c6ac4' : '#dddddd',
                vLineColor: (i) => '#dddddd',
                paddingLeft: (i) => 8,
                paddingRight: (i) => 8,
                paddingTop: (i) => 6,
                paddingBottom: (i) => 6,
              }
            },
          ],
          footer: (currentPage, pageCount) => ({
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: 'center',
            margin: [0, 10, 0, 0],
          }),
          defaultStyle: {
            font: 'Roboto',
          },
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              color: '#3c4257',
              margin: [0, 0, 0, 10],
            },
            subheader: {
              fontSize: 12,
              italics: true,
              color: '#666666',
            },
            tableHeader: {
              bold: true,
              fontSize: 11,
              color: '#2d3748',
              fillColor: '#e2e8f0',
              alignment: 'center',
            },
            oddRow: {
              fillColor: '#f7fafc',
            },
            ...options?.styles,
          },
          pageOrientation: options?.orientation || 'portrait',
          pageSize,
          pageMargins: [40, 40, 40, 60],
        };

        // Generate and download PDF
        pdfMake.createPdf(docDefinition).download(filename);
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