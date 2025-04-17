import React, { useState } from 'react';
import { SmartTable } from '@/components/SmartTable/SmartTable';
import { Box, Typography, Container, Paper, Button, Stack, Alert, Switch, FormControlLabel } from '@mui/material';
import { generateData, FetchDataOptions, FetchDataResult, TOTAL_ROWS } from '@/data/generateData';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  state: string;
  phone: string;
  department: string;
  salary: number;
}

export const PDFButtonTest = () => {
  const [exportCount, setExportCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [useMock, setUseMock] = useState(true);

  // Mock columns for our test
  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
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
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      size: 80,
      // Custom PDF renderer for testing
      pdfRenderer: (row: Person) => `${row.age} years old`,
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'state',
      header: 'State',
    },
  ];

  // Mock data fetching function with proper return type
  const fetchData = async (options: FetchDataOptions): Promise<FetchDataResult> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let data: Person[] = [];
    
    if (options.enablePaginatedDataFetch) {
      const { pageSize, pageIndex } = options;
      data = generateData(pageSize, pageIndex * pageSize);
    } else {
      const { rowCount, pageSize } = options;
      data = generateData(rowCount);
    }
    
    // Apply filters if needed (omitted for simplicity)
    // Apply sorting if needed (omitted for simplicity)
    
    return {
      data,
      totalRows: options.enablePaginatedDataFetch ? TOTAL_ROWS : options.rowCount,
      pageCount: options.enablePaginatedDataFetch 
        ? Math.ceil(TOTAL_ROWS / options.pageSize) 
        : Math.ceil(options.rowCount / options.pageSize),
    };
  };

  // Function to handle export events
  const handleExport = () => {
    setExportCount(prev => prev + 1);
    setMessage(`PDF export triggered ${exportCount + 1} times! ${useMock ? '(Using mock export)' : '(Using real export)'}`);
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          PDF Export Button Test
        </Typography>
        <Typography variant="body1" paragraph>
          This component tests that the PDF export button appears correctly in the table toolbar.
          Click the download icon in the toolbar to trigger PDF export.
        </Typography>
        
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => {
              setExportCount(0);
              setMessage("Export counter reset");
              setTimeout(() => setMessage(null), 3000);
            }}
          >
            Reset Export Counter
          </Button>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            Export triggered: {exportCount} times
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={useMock}
                onChange={(e) => setUseMock(e.target.checked)}
                name="useMock"
                color="primary"
              />
            }
            label="Use Mock Export"
          />
        </Stack>
        
        <Box sx={{ mt: 2 }}>
          <SmartTable
            columns={columns}
            fetchData={fetchData}
            initialPageSize={5}
            rowCount={50}
            enablePDFExport={true}
            useMockExport={useMock}
            onExport={handleExport}
            pdfExportOptions={{
              title: 'PDF Button Test',
              orientation: 'landscape',
              styles: {
                tableHeader: {
                  bold: true,
                  fontSize: 12,
                  color: '#2d3748',
                  fillColor: '#e2e8f0',
                },
                oddRow: {
                  fillColor: '#f7fafc',
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default PDFButtonTest; 