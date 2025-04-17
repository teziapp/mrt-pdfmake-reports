import { useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Button, Stack, Divider } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import { SmartTable } from './components/SmartTable/SmartTable';
import { type Person, fetchData } from './data/generateData';
import PDFButtonTest from '../playground/PDFButtonTest';

function App() {
  const [showPDFTest, setShowPDFTest] = useState(false);

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
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Smart Table Demo
          </Typography>
          <Button 
            variant="contained" 
            color={showPDFTest ? "secondary" : "primary"}
            onClick={() => setShowPDFTest(!showPDFTest)}
          >
            {showPDFTest ? "Show Default Table" : "Show PDF Button Test"}
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {showPDFTest ? (
          <PDFButtonTest />
        ) : (
          <>
            <Typography variant="body1" paragraph>
              The default table has PDF export enabled. Look for the download icon in the toolbar.
            </Typography>
            <SmartTable
              columns={columns}
              fetchData={fetchData}
              initialPageSize={10}
              rowCount={50}
              enablePaginatedDataFetch={false}
              enablePDFExport={true}
              pdfExportOptions={{
                title: 'Employee Data',
                orientation: 'landscape',
              }}
            />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
