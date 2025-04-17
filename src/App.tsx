import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import { SmartTable } from './components/SmartTable/SmartTable';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
}

const data: Person[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30, city: 'New York', state: 'NY' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, city: 'Los Angeles', state: 'CA' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, city: 'Chicago', state: 'IL' },
  { id: 4, firstName: 'Alice', lastName: 'Brown', age: 35, city: 'Houston', state: 'TX' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson', age: 28, city: 'Phoenix', state: 'AZ' },
];

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
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
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Smart Table Demo
        </Typography>
        <SmartTable
          columns={columns}
          data={data}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
