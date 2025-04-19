import type { MRT_ColumnDef, MRT_Cell } from '../../lib/node_modules/material-react-table';
import type { IPerson } from './types/IPerson';

export const columns: MRT_ColumnDef<IPerson>[] = [
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
      Cell: ({ cell }: { cell: MRT_Cell<IPerson> }) => `$${(cell.getValue() as number).toLocaleString()}`,
    },
  ];