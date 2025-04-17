import React from 'react';
import { SmartTable } from '@/components/SmartTable/SmartTable';
import { Box, Typography, Container, Paper } from '@mui/material';
import { generateData } from '@/data/generateData';

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  state: string;
}

export const PDFExportExample = () => {
  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      enableHiding: false,
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
      // Custom PDF renderer for age that adds "years old"
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

  const fetchData = async (options: any) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate mock data
    const result = generateData({
      ...options,
      dataType: 'person',
    });

    return result;
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          PDF Export Example
        </Typography>
        <Typography variant="body1" paragraph>
          This example demonstrates how to use the PDF export feature with SmartTable.
          Click the download icon in the toolbar to export the current table view to PDF.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <SmartTable
            columns={columns}
            fetchData={fetchData}
            initialPageSize={10}
            rowCount={100}
            enablePDFExport={true}
            pdfExportOptions={{
              title: 'People Data Export',
              orientation: 'landscape',
              styles: {
                tableHeader: {
                  bold: true,
                  fontSize: 12,
                  color: '#2d3748',
                  fillColor: '#e2e8f0',
                },
                // Add custom styles for the PDF
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

export default PDFExportExample; 