# SmartTable

A highly customizable React table component built on top of Material React Table with enhanced features.

## Features

- All core Material React Table features
- Built-in support for:
  - Column-level and global filters
  - Grouping, sorting, and pagination
  - PDF export with custom templates
  - Dynamic column visibility controls
  - Column drag-and-drop
- Theming support (Material UI v5)
- TypeScript support

## Installation

```bash
npm install @mohit/smart-table
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "@mui/icons-material": "^7.0.0",
  "@mui/material": "^7.0.0",
  "material-react-table": "^3.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-window": "^1.8.0"
}
```

## Usage

```tsx
import { SmartTable } from '@mohit/smart-table';

const MyComponent = () => {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
  ];

  const fetchData = async (options) => {
    // Implement your data fetching logic here
    return {
      data: [],
      pageCount: 0,
    };
  };

  return (
    <SmartTable
      columns={columns}
      fetchData={fetchData}
      enablePDFExport
      enableColumnFilters
      enableGrouping
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | MRT_ColumnDef[] | required | Column definitions |
| fetchData | (options: FetchDataOptions) => Promise<FetchDataResult> | required | Function to fetch data |
| initialPageSize | number | 10 | Initial number of rows per page |
| rowCount | number | 10000 | Total number of rows |
| enablePaginatedDataFetch | boolean | true | Enable server-side pagination |
| enableColumnFilters | boolean | true | Enable column-level filters |
| enableGrouping | boolean | true | Enable row grouping |
| enableColumnDragging | boolean | true | Enable column drag and drop |
| enableGlobalFilter | boolean | true | Enable global search |
| enablePDFExport | boolean | true | Enable PDF export |
| pdfExportOptions | PDFExportOptions | undefined | PDF export configuration |
| useMockExport | boolean | false | Use mock export for testing |
| onExport | () => void | undefined | Callback when export is triggered |

## License

MIT
