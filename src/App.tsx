import { useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import { SmartTable } from './components/SmartTable/SmartTable';
import { type Person, fetchData } from './data/generateData';

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
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'department',
        header: 'Department',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
        Cell: ({ cell }) => `$${cell.getValue<number>().toLocaleString()}`,
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
          fetchData={fetchData}
          initialPageSize={50}
          // temporary for development only
          rowCount={25}
          enablePaginatedDataFetch={false}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
