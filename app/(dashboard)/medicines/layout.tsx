'use client';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import BaseTable from '../../../components/base/BaseTable';
import {
  Badge,
  Flex,
  SimpleGrid,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react';
import { MenuButton } from '../../../components/system/MenuButton';
import BaseTitle from '../../../components/base/BaseTitle';
import BaseBtn from '../../../components/base/BaseBtn';
import { useRouter } from 'next/navigation';
import MedicineCard from '../../../components/medicine/MedicineCard';
import { MdTableChart, MdGridView } from 'react-icons/md';
import SysViewMode from '../../../components/system/SysViewMode';
import BaseBadge from '../../../components/base/BaseBadge';
import { Medicine } from '../../../lib/types';
import { api } from '../../../lib/api';
import { useQuery } from '@tanstack/react-query';

type ViewMode = 'table' | 'cards';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const columns: ColumnDef<Medicine>[] = [
    {
      header: 'Name',
      accessorKey: 'tradeName',
      cell: (info) => <strong>{String(info.getValue())}</strong>,
    },
    {
      header: 'Scientific Name',
      accessorKey: 'scientificName',
      cell: (info) => (
        <span style={{ color: '#666', fontStyle: 'italic' }}>
          {String(info.getValue())}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const value = String(info.getValue());
        return (
          <BaseBadge
            colorPalette={
              info.row.original.requiresPrescription ? 'green' : 'red'
            }
          >
            {value}
          </BaseBadge>
        );
      },
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <MenuButton
          onEdit={() => alert(`Edit ${row.original.tradeName}`)}
          onDelete={() => alert(`Delete ${row.original.tradeName}`)}
        />
      ),
    },
  ];

  const { data, isLoading } = useQuery<Medicine[]>({
    queryKey: ['medicines'],
    queryFn: () => api('/pharmacy_products'),
  })

  const router = useRouter();

  return (
    <>
      <Flex align='center' justify='space-between' mb={6}>
        <BaseTitle>Medicines</BaseTitle>

        <HStack gap={4}>
          <SysViewMode viewMode={viewMode} setViewMode={setViewMode} />

          <BaseBtn onClick={() => router.push('/medicines/create')}>
            Add Medicine
          </BaseBtn>
        </HStack>
      </Flex>

      {/* Conditional Rendering based on view mode */}
      {viewMode === 'table' ? (
        <BaseTable columns={columns} data={data ?? []} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {data?.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onEdit={() => alert(`Edit ${medicine.tradeName}`)}
              onDelete={() => alert(`Delete ${medicine.tradeName}`)}
            />
          ))}
        </SimpleGrid>
      )}

      {children}
    </>
  );
}
