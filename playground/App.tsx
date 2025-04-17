import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SmartTable } from '../src';
import { lightTheme } from '../src/themes';

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  state: string;
}

const data: Person[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    city: 'New York',
    state: 'NY',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    city: 'Los Angeles',
    state: 'CA',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 45,
    city: 'Chicago',
    state: 'IL',
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Williams',
    age: 28,
    city: 'Houston',
    state: 'TX',
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 35,
    city: 'Phoenix',
    state: 'AZ',
  },
];

function App() {
  const columns = useMemo(
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
    []
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div style={{ padding: '2rem' }}>
        <SmartTable
          data={data}
          columns={columns}
          enablePDFExport
          enableStatePersistence
          stateStorageKey="example-table"
          enableDebugMode
        />
      </div>
    </ThemeProvider>
  );
}

export default App; 