# PDF Export Feature for SmartTable

This directory contains the exporter plugins for the SmartTable component. Currently, it supports PDF export using PDFMake.

## How to Use PDF Export

1. Import the SmartTable component:
```tsx
import { SmartTable } from '@/components/SmartTable/SmartTable';
```

2. Enable PDF export in your SmartTable:
```tsx
<SmartTable
  columns={columns}
  fetchData={fetchData}
  enablePDFExport={true}
  pdfExportOptions={{
    title: 'My Table Export',
    orientation: 'landscape', // or 'portrait'
    pageSize: 'A4', // 'A3', 'A4', 'A5', 'LETTER', etc.
    styles: {
      // Custom styles
    },
  }}
/>
```

3. Customize individual column export:
```tsx
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    // Disable this column in PDF export
    enablePDFExport: false,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    // Custom renderer for this column in PDF
    pdfRenderer: (row) => `${row.age} years old`,
  },
];
```

## PDF Export Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | 'Table Export' | Title displayed at the top of the PDF |
| `orientation` | 'portrait' \| 'landscape' | 'portrait' | Page orientation |
| `pageSize` | string | 'A4' | Page size (A4, A3, LETTER, etc.) |
| `styles` | object | - | Custom styles for the PDF |

## Column PDF-specific Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enablePDFExport` | boolean | true | Whether to include this column in the PDF export |
| `pdfRenderer` | function | - | Custom renderer function for the cell content in PDF |

## PDF Features

- Respects current table sorting
- Respects column visibility settings
- Supports custom styling for headers and alternating rows
- Includes page numbers
- Includes generation timestamp
- Automatic file naming with timestamp
- Responsive column widths based on column size 