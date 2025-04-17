# SmartTable

A highly customizable, modular, and developer-friendly table library built on top of [Material React Table (MRT)](https://www.material-react-table.com/), designed to simplify building powerful, production-ready data grids with minimal configuration.

## Features

- 📊 **Enhanced Material React Table**
  - All MRT features plus additional functionality
  - Beautiful Material Design UI
  - TypeScript support with strict typing

- 🔄 **Advanced State Management**
  - Local storage persistence
  - Backend state sync
  - Configurable auto-save

- 📑 **PDF Export**
  - Export with preserved grouping and sorting
  - Custom header/footer support
  - Configurable styling

- 🎨 **Deep UI Customization**
  - Theme customization
  - Component-level styling
  - Light/Dark mode support

- 🚀 **Performance Optimized**
  - Row virtualization
  - Lazy-loaded heavy features
  - Minimal bundle size

## Installation

```bash
npm install @mohitpatel1/smart-table
```

### Peer Dependencies

```bash
npm install @mui/material @emotion/react @emotion/styled material-react-table
```

## Quick Start

```tsx
import { SmartTable } from '@mohitpatel1/smart-table';

function App() {
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

  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  return (
    <SmartTable
      data={data}
      columns={columns}
      enablePDFExport
      enableStatePersistence
    />
  );
}
```

## Features

### PDF Export

```tsx
<SmartTable
  data={data}
  columns={columns}
  enablePDFExport
  pdfExportOptions={{
    title: 'My Table Export',
    orientation: 'landscape',
    pageSize: 'A4',
  }}
/>
```

### State Persistence

```tsx
<SmartTable
  data={data}
  columns={columns}
  enableStatePersistence
  stateStorageKey="my-table-state"
/>
```

### Backend Sync

```tsx
<SmartTable
  data={data}
  columns={columns}
  enableBackendSync
  backendSyncOptions={{
    endpoint: '/api/table-state',
    syncInterval: 30000,
    token: 'your-auth-token',
  }}
/>
```

### Theme Customization

```tsx
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '@mohitpatel1/smart-table';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <SmartTable data={data} columns={columns} />
    </ThemeProvider>
  );
}
```

## API Reference

### SmartTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TData[]` | Required | The data to display in the table |
| `columns` | `SmartTableColumn<TData>[]` | Required | Column definitions |
| `enablePDFExport` | `boolean` | `false` | Enable PDF export functionality |
| `pdfExportOptions` | `PDFExportOptions` | - | PDF export configuration |
| `enableStatePersistence` | `boolean` | `false` | Enable state persistence |
| `stateStorageKey` | `string` | `'smartTable'` | Storage key for state |
| `enableBackendSync` | `boolean` | `false` | Enable backend state sync |
| `backendSyncOptions` | `BackendSyncOptions` | - | Backend sync configuration |
| `enableDebugMode` | `boolean` | `false` | Enable debug logging |

Plus all [Material React Table props](https://www.material-react-table.com/docs/api).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Run Storybook
npm run storybook
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Mohit Patel](https://github.com/MohitPatel1)
