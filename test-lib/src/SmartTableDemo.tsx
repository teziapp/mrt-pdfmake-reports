import React from 'react';
import { SmartTable } from '../../lib/components/SmartTable';
import { fetchData, type Person } from './data';
import type { MRT_ColumnDef } from '../../node_modules/material-react-table';
import { usePDFExport } from './hooks/usePDFExport';

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
  const handleFetchData = async (options: any) => {
    const result = await fetchData({
      ...options,
      enablePaginatedDataFetch: true,
    });
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>SmartTable Demo with PDF Export</h1>
      <SmartTable<Person>
        columns={columns}
        fetchData={handleFetchData}
        initialPageSize={10}
        rowCount={1000}
        enablePDFExport={true}
        pdfExportOptions={{
          title: 'Employee Report',
          subtitle: 'Generated from SmartTable Demo',
          orientation: 'landscape',
        }}
        onExport={() => {
          exportToPDF({
            data: [],
            columns: [],
            state: {},
          });
        }}
      />
    </div>
  );
}; 