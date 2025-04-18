import React, { useState } from 'react';
import { SmartTable } from '../../lib/components/SmartTable';
import type { MRT_ColumnDef } from '../../node_modules/material-react-table';
import { Button, Box } from '@mui/material';

interface Person {
  name: string;
  age: number;
  city: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockData: Person[] = [
  { name: 'John Doe', age: 30, city: 'New York', status: 'active', joinDate: '2023-01-01' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles', status: 'active', joinDate: '2023-02-15' },
  { name: 'Bob Johnson', age: 45, city: 'Chicago', status: 'inactive', joinDate: '2022-11-30' },
  { name: 'Alice Brown', age: 28, city: 'Houston', status: 'active', joinDate: '2023-03-10' },
  { name: 'Charlie Wilson', age: 35, city: 'Phoenix', status: 'inactive', joinDate: '2022-12-20' },
];

const TestComponent: React.FC = () => {
  const [pageSize, setPageSize] = useState(5);

  const columns: MRT_ColumnDef<Person>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableGrouping: true,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      filterFn: 'between',
    },
    {
      accessorKey: 'city',
      header: 'City',
      enableGrouping: true,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      filterFn: 'equals',
      Cell: ({ cell }) => (
        <span style={{ color: (cell.getValue() as string) === 'active' ? 'green' : 'red' }}>
          {cell.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'joinDate',
      header: 'Join Date',
      filterFn: 'between',
    },
  ];

  const fetchData = async (options: any) => {
    console.log('Fetch options:', options);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter data
    let filteredData = [...mockData];
    
    if (options.filters?.length) {
      filteredData = filteredData.filter(row => {
        return options.filters.every((filter: any) => {
          const value = row[filter.id as keyof Person];
          return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
        });
      });
    }

    // Sort data
    if (options.sorting?.length) {
      const sort = options.sorting[0];
      filteredData.sort((a, b) => {
        const aVal = a[sort.id as keyof Person];
        const bVal = b[sort.id as keyof Person];
        return sort.desc ? String(bVal).localeCompare(String(aVal)) : String(aVal).localeCompare(String(bVal));
      });
    }

    // Paginate
    const start = options.pageIndex * options.pageSize;
    const paginatedData = filteredData.slice(start, start + options.pageSize);

    return {
      data: paginatedData,
      pageCount: Math.ceil(filteredData.length / options.pageSize),
    };
  };

  return (
    <Box>
      <Box mb={2}>
        <Button onClick={() => setPageSize(prev => prev + 5)} variant="contained" sx={{ mr: 1 }}>
          Increase Page Size
        </Button>
        <Button onClick={() => setPageSize(prev => Math.max(5, prev - 5))} variant="contained">
          Decrease Page Size
        </Button>
      </Box>
      
      <SmartTable<Person>
        columns={columns}
        fetchData={fetchData}
        enablePDFExport
        enableColumnFilters
        enableGrouping
        enableColumnDragging
        enableGlobalFilter
        initialPageSize={pageSize}
        rowCount={mockData.length}
        pdfExportOptions={{
          title: 'People Report',
          subtitle: 'Generated from SmartTable',
          orientation: 'landscape',
        }}
      />
    </Box>
  );
};

export default TestComponent; 