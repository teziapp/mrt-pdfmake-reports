# MRT Upgrade

An enhanced version of Material React Table with additional features like dynamic sidebar, enhanced filtering, and export capabilities.

## Installation

```bash
npm install mrt-upgrade
```

## Features

- Dynamic sidebar for table controls
- Enhanced filtering capabilities
- Export to PDF, CSV, and Excel
- Customizable styling
- Built on top of Material React Table

## Usage

```tsx
import { DynamicTable } from 'mrt-upgrade';

// Your data
const data = [
  { id: 1, name: "John Doe", age: 28, city: "New York" },
  { id: 2, name: "Jane Smith", age: 32, city: "San Francisco" },
  // ...more data
];

function App() {
  return (
    <DynamicTable 
      data={data}
      sidebar={{ 
        enabled: true,
        width: 350,
        defaultOpen: true
      }}
      export={{
        enabled: true,
        pdfExport: true
      }}
    />
  );
}
```

## Props

The `DynamicTable` component accepts the following props:

- `data`: Array of objects containing your table data
- `columns`: Optional column definitions
- `sidebar`: Configuration for the sidebar
- `export`: Configuration for export capabilities
- `customStyles`: Custom styles for the table, sidebar, and container
- Various callback functions for filtering, searching, etc.

## Examples

Check out the `/examples` directory for more detailed usage examples.

## License

MIT

