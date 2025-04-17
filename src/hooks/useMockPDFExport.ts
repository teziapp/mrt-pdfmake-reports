import { useCallback } from 'react';
import { PDFExportOptions } from '@/types/table';

interface UseMockPDFExportOptions {
  enabled: boolean;
  options?: PDFExportOptions;
  onExport?: () => void;
}

export function useMockPDFExport({ enabled, options, onExport }: UseMockPDFExportOptions) {
  const exportToPDF = useCallback(
    async ({ data, columns, state }: any) => {
      if (!enabled) return;

      console.log('MOCK PDF EXPORT', {
        data: data.slice(0, 3), // Log just a few rows for brevity
        columns: columns.map((col: any) => ({
          header: col.header,
          accessorKey: col.accessorKey
        })),
        state,
        options
      });

      // Create a mock dialog showing export was triggered
      const mockDialog = document.createElement('div');
      mockDialog.style.position = 'fixed';
      mockDialog.style.top = '20px';
      mockDialog.style.right = '20px';
      mockDialog.style.padding = '20px';
      mockDialog.style.backgroundColor = '#4caf50';
      mockDialog.style.color = 'white';
      mockDialog.style.borderRadius = '4px';
      mockDialog.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      mockDialog.style.zIndex = '9999';
      mockDialog.style.transition = 'opacity 0.5s ease-in-out';
      mockDialog.textContent = `✅ PDF Export triggered with ${data.length} rows and ${columns.length} columns`;
      document.body.appendChild(mockDialog);

      // Call the callback if provided
      if (onExport) {
        onExport();
      }

      // Remove the dialog after 3 seconds
      setTimeout(() => {
        mockDialog.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(mockDialog);
        }, 500);
      }, 3000);
    },
    [enabled, options, onExport]
  );

  return {
    exportToPDF,
  };
} 