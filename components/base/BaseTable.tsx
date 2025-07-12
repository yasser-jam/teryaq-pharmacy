'use client'
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

import { Table, Badge } from '@chakra-ui/react';
import { MenuButton } from '../system/MenuButton';


interface BaseTableProps {
    columns: any[]
    data: any[]
}

export default function BaseTable({ columns, data } : BaseTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table.Root
      p={6}
      bg="white"
      shadow={'xs'}
    >
      <Table.Header borderRadius={'lg'}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeader
                key={header.id}
                px={4}
                py={3}
                fontSize="xs"
                color="gray.500"
                fontWeight="light"
                borderBottom="1px solid"
                borderColor="#F8F9FA"
    
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id} px={4} py={3}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
