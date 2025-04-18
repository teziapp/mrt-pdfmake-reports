# @mohit11/smart-table

A modular, fully customizable TypeScript-based React component library that wraps and extends Material React Table (MRT). This library provides enhanced functionality while maintaining full compatibility with MRT's features.

## Features

- All core MRT features exposed transparently
- Built-in support for:
  - Column-level and global filters
  - Grouping, sorting, and pagination
  - Saved table states (localStorage or external persistence)
  - Export to PDF with custom templates
  - Dynamic column visibility controls
  - Column drag-and-drop
- Theming support (Material UI v5) with light/dark toggle
- Optional custom toolbars, buttons, and row-level actions

## Installation

```bash
npm install @mohit11/smart-table
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material material-react-table react-window
```

## Basic Usage

```tsx
import { SmartTable } from '@mohit11/smart-table';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

const MyTable = () => {
  const data = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25 },
  ];

  return (
    <SmartTable
      columns={columns}
      data={data}
      enablePDFExport={true}
    />
  );
};
```

## Documentation

For detailed documentation and advanced usage examples, please visit our [documentation page](https://github.com/mohit11/mrt-reports-mohit-fork#documentation).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 