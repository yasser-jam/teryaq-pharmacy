'use client'
import { ColumnDef } from '@tanstack/react-table';
import BaseTable from '../../components/base/BaseTable';
import { Badge } from '@chakra-ui/react';
import { MenuButton } from '../../components/system/MenuButton';

export default function Layout() {
  const columns: ColumnDef<any>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => <strong>{'hello  test'}</strong>,
    },
    {
      header: 'Email Address',
      accessorKey: 'email',
      cell: (info) => (
        <span style={{ color: '#666' }}>{'hello my firend'}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const value = info.getValue();
        return (
          <Badge colorScheme={value === 'active' ? 'green' : 'red'}>
            'test'
          </Badge>
        );
      },
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <MenuButton
          onEdit={() => alert(`Edit ${row.original.name}`)}
          onDelete={() => alert(`Delete ${row.original.name}`)}
        />
      ),
    },
  ];

  const data: any[] = [
    { id: 1, name: 'Yasser', email: 'yasser@example.com', status: 'active' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
    { id: 2, name: 'Salma', email: 'salma@example.com', status: 'inactive' },
  ];

  return (
    <>
      <BaseTable columns={columns} data={data}></BaseTable>
    </>
  );
}
