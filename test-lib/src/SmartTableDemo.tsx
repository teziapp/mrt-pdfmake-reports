import React, { useState } from 'react';
import { SmartTable } from '../../lib/components/SmartTable';
import { fetchData, type Person } from './data';
import type { MRT_ColumnDef } from '../../node_modules/material-react-table';
import { usePDFExport } from './hooks/usePDFExport';
import { Button, Stack } from '@mui/material';

const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
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
    size: 50,
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
    size: 50,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
    Cell: ({ cell }) => `$${(cell.getValue() as number).toLocaleString()}`,
  },
];

export const SmartTableDemo: React.FC = () => {
  // State to toggle between client-side and server-side data
  const [useClientSideData, setUseClientSideData] = useState(false);
  const [clientData, setClientData] = useState<Person[]>([]);

  const handleFetchData = async (options: any) => {
    const result = await fetchData({
      ...options,
      enablePaginatedDataFetch: true,
    });
    
    // If in client-side mode, store the fetched data
    if (useClientSideData && result.data.length > 0) {
      setClientData(result.data);
    }
    
    return {
      data: result.data,
      pageCount: result.pageCount,
    };
  };

  const { exportToPDF } = usePDFExport({
    options: {
      title: 'Employee Report',
      subtitle: 'Generated from SmartTable Demo',
      orientation: 'landscape',
    },
  });

  const commonProps = {
    columns,
    initialPageSize: 10,
    enablePDFExport: true,
    pdfExportOptions: {
      title: 'Employee Report',
      subtitle: 'Generated from SmartTable Demo',
      orientation: 'landscape' as const,
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SmartTable Demo with PDF Export</h1>
      
      <Stack direction="row" spacing={2} mb={2}>
        <Button 
          variant="contained" 
          onClick={() => setUseClientSideData(!useClientSideData)}
        >
          {useClientSideData ? 'Switch to Server-side Data' : 'Switch to Client-side Data'}
        </Button>
      </Stack>

      <SmartTable<Person>
        {...commonProps}
        fetchData={useClientSideData ? undefined : handleFetchData}
        rowCount={useClientSideData ? clientData.length : 1000}
        onExport={() => {
          exportToPDF({
            data: useClientSideData ? clientData : [],
            columns: [],
            state: {},
          });
        }}
      />
    </div>
  );
}; 