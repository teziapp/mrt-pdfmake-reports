# @teziapp/smartreport

A React library for generating smart PDF reports using pdfmake.

## Installation

```bash
npm install @teziapp/smartreport

# Install peer dependencies if not already installed
npm install @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/x-date-pickers material-react-table
```

## Usage

```tsx
import { SmartReport } from '@teziapp/smartreport';

function App() {
  return (
    <SmartReport
      // Add your configuration here
    />
  );
}
```

## Features

- Modern React components for PDF report generation
- Material-UI based interface
- TypeScript support
- Customizable report templates
- Interactive report builder

## Documentation

For detailed documentation and examples, please visit our Storybook:

```bash
npm run storybook
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the terms of the license found in the LICENSE file.
