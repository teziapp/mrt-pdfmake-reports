# SmartTable Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Core Features](#core-features)
5. [Advanced Usage](#advanced-usage)
6. [API Reference](#api-reference)
7. [Plugins](#plugins)
8. [Theming](#theming)
9. [Examples](#examples)
10. [Contributing](#contributing)

## Introduction

SmartTable is a powerful, fully customizable React table component built on top of Material React Table (MRT). It provides an enhanced developer experience with built-in features like state persistence, PDF export, backend synchronization, and more.

### Key Features
- 🔍 Advanced filtering with column and global search
- 🔄 Server-side pagination and sorting
- 📊 Column grouping and drag-and-drop reordering
- 💾 State persistence (localStorage and backend sync)
- 📑 PDF export with customizable templates
- 🎨 Material UI v5 theming support
- 🧩 Plugin system for extensibility
- 🔧 Fully typed TypeScript support

## Installation

```bash
# Using npm
npm install @your-org/smart-table @mui/material @emotion/react @emotion/styled

# Using yarn
yarn add @your-org/smart-table @mui/material @emotion/react @emotion/styled

# Using pnpm
pnpm add @your-org/smart-table @mui/material @emotion/react @emotion/styled
```

## Quick Start

Here's a basic example to get you started:

```tsx
import { SmartTable } from '@your-org/smart-table';
import type { MRT_ColumnDef } from 'material-react-table';

interface Person {
  name: string;
  age: number;
  city: string;
}

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
];

const data: Person[] = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
];

function App() {
  return (
    <SmartTable
      columns={columns}
      data={data}
      enableStatePersistence
      stateStorageKey="my-table-state"
    />
  );
}
```

## Core Features

### Server-Side Integration

SmartTable supports server-side operations out of the box:

```tsx
function ServerSideTable() {
  const fetchData = async (options: FetchDataOptions) => {
    const response = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(options),
    });
    return response.json();
  };

  return (
    <SmartTable
      columns={columns}
      fetchData={fetchData}
      enablePaginatedDataFetch
      initialPageSize={10}
      rowCount={1000} // Total number of rows in dataset
    />
  );
}
```

### State Persistence

Enable automatic state persistence to localStorage:

```tsx
<SmartTable
  columns={columns}
  data={data}
  enableStatePersistence
  stateStorageKey="unique-table-key"
/>
```

For backend synchronization:

```tsx
<SmartTable
  columns={columns}
  data={data}
  enableBackendSync
  backendSyncOptions={{
    endpoint: '/api/table-state',
    syncInterval: 5000, // sync every 5 seconds
    onError: (error) => console.error('Sync failed:', error),
  }}
/>
```

### PDF Export

Enable PDF export with custom templates:

```tsx
<SmartTable
  columns={columns}
  data={data}
  enablePDFExport
  pdfExportOptions={{
    fileName: 'table-export',
    template: 'default',
    customStyles: {
      header: { fontSize: 12, bold: true },
      cell: { fontSize: 10 },
    },
  }}
/>
```

### Column Grouping

Enable column grouping with drag-and-drop support:

```tsx
<SmartTable
  columns={columns}
  data={data}
  enableGrouping
  enableColumnDragging
  initialState={{
    grouping: ['city'], // Initially group by city
  }}
/>
```

## Advanced Usage

### Custom Toolbar Actions

Extend the toolbar with custom actions:

```tsx
import { Toolbar } from '@your-org/smart-table/components';

function CustomToolbar({ instance }) {
  return (
    <Toolbar
      instance={instance}
      enablePDFExport
      customActions={[
        {
          icon: <CustomIcon />,
          tooltip: 'Custom Action',
          onClick: () => {/* Custom handler */},
        },
      ]}
    />
  );
}

<SmartTable
  columns={columns}
  data={data}
  components={{
    Toolbar: CustomToolbar,
  }}
/>
```

### Custom Column Visibility Menu

Customize the column visibility menu:

```tsx
import { ColumnVisibilityMenu } from '@your-org/smart-table/components';

function CustomVisibilityMenu({ instance }) {
  return (
    <ColumnVisibilityMenu
      instance={instance}
      customRenderer={(columns) => (
        // Custom rendering logic
      )}
    />
  );
}
```

### Custom Pagination Controls

Implement custom pagination:

```tsx
import { PaginationControls } from '@your-org/smart-table/components';

function CustomPagination({ instance }) {
  return (
    <PaginationControls
      instance={instance}
      pageSizeOptions={[10, 25, 50, 100]}
      customRenderer={(props) => (
        // Custom rendering logic
      )}
    />
  );
}
```

## API Reference

### SmartTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | MRT_ColumnDef[] | required | Column definitions |
| data | T[] | required | Table data |
| enableStatePersistence | boolean | false | Enable state persistence to localStorage |
| stateStorageKey | string | 'smartTable' | Key for localStorage state |
| enablePDFExport | boolean | false | Enable PDF export functionality |
| pdfExportOptions | PDFExportOptions | undefined | PDF export configuration |
| enableBackendSync | boolean | false | Enable backend state sync |
| backendSyncOptions | BackendSyncOptions | undefined | Backend sync configuration |
| enableDebugMode | boolean | false | Enable debug logging |
| muiTableContainerProps | TableContainerProps | undefined | MUI TableContainer props |

### Hooks

#### useSmartTable

```tsx
const {
  tableState,
  tableInstance,
  handleStateChange,
  handleExportPDF,
  handleSyncState,
} = useSmartTable({
  data,
  columns,
  enableStatePersistence,
  // ... other options
});
```

## Plugins

### PDF Export Plugin

The PDF export plugin allows customization of exported PDFs:

```tsx
import { PDFExporter } from '@your-org/smart-table/plugins/exporters';

const exporter = new PDFExporter({
  template: 'custom',
  styles: {
    header: { /* ... */ },
    body: { /* ... */ },
    footer: { /* ... */ },
  },
  metadata: {
    title: 'Export Title',
    author: 'Your Name',
  },
});

<SmartTable
  // ...
  enablePDFExport
  pdfExportOptions={{
    exporter,
    fileName: 'custom-export',
  }}
/>
```

### Backend Sync Plugin

Configure backend synchronization:

```tsx
import { BackendSyncAdapter } from '@your-org/smart-table/plugins/adapters';

const syncAdapter = new BackendSyncAdapter({
  endpoint: '/api/sync',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token',
  },
  transformRequest: (state) => ({
    // Transform state before sending
  }),
  transformResponse: (response) => ({
    // Transform response before applying
  }),
});

<SmartTable
  // ...
  enableBackendSync
  backendSyncOptions={{
    adapter: syncAdapter,
    syncInterval: 5000,
  }}
/>
```

## Theming

SmartTable uses Material UI's theming system:

```tsx
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    // ... other component overrides
  },
});

<ThemeProvider theme={theme}>
  <SmartTable /* ... */ />
</ThemeProvider>
```

## Examples

### Basic Table
```tsx
import { SmartTable } from '@your-org/smart-table';

const BasicTable = () => (
  <SmartTable
    columns={columns}
    data={data}
    enableColumnFilters
    enableGlobalFilter
    enablePagination
  />
);
```

### Server-Side Table with All Features
```tsx
const AdvancedTable = () => (
  <SmartTable
    columns={columns}
    fetchData={fetchData}
    enablePaginatedDataFetch
    enableStatePersistence
    stateStorageKey="advanced-table"
    enablePDFExport
    pdfExportOptions={{
      fileName: 'advanced-export',
      template: 'detailed',
    }}
    enableBackendSync
    backendSyncOptions={{
      endpoint: '/api/sync',
      syncInterval: 5000,
    }}
    enableGrouping
    enableColumnDragging
    enableColumnResizing
    enablePinning
    enableRowSelection
  />
);
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Run tests:
   ```bash
   pnpm test
   ```

### Building for Production

```bash
pnpm build
```

This will create a production-ready build in the `dist` directory.
