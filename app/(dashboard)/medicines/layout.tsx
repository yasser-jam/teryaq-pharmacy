'use client';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import BaseTable from '../../../components/base/BaseTable';
import { Badge, Flex, SimpleGrid, Button, HStack, Text } from '@chakra-ui/react';
import { MenuButton } from '../../../components/system/MenuButton';
import BaseTitle from '../../../components/base/BaseTitle';
import BaseBtn from '../../../components/base/BaseBtn';
import { useRouter } from 'next/navigation';
import MedicineCard from '../../../components/medicine/MedicineCard';
import { MdTableChart, MdGridView } from 'react-icons/md';

type ViewMode = 'table' | 'cards';

interface Medicine {
  id: number;
  name: string;
  scientificName: string;
  status: string;
  image?: string;
}

export default function Layout() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const columns: ColumnDef<Medicine>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => <strong>{String(info.getValue())}</strong>,
    },
    {
      header: 'Scientific Name',
      accessorKey: 'scientificName',
      cell: (info) => (
        <span style={{ color: '#666', fontStyle: 'italic' }}>{String(info.getValue())}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const value = String(info.getValue());
        return (
          <Badge colorScheme={value === 'active' ? 'green' : 'red'}>
            {value}
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

  const data: Medicine[] = [
    { 
      id: 1, 
      name: 'Aspirin', 
      scientificName: 'Acetylsalicylic acid',
      status: 'active',
      image: '/medicines/aspirin.jpg'
    },
    { 
      id: 2, 
      name: 'Ibuprofen', 
      scientificName: 'Isobutylphenylpropanoic acid',
      status: 'active',
      image: '/medicines/ibuprofen.jpg'
    },
    { 
      id: 3, 
      name: 'Amoxicillin', 
      scientificName: 'Amoxicillin trihydrate',
      status: 'inactive',
      image: '/medicines/amoxicillin.jpg'
    },
    { 
      id: 4, 
      name: 'Paracetamol', 
      scientificName: 'N-acetyl-para-aminophenol',
      status: 'active',
      image: '/medicines/paracetamol.jpg'
    },
    { 
      id: 5, 
      name: 'Omeprazole', 
      scientificName: '5-methoxy-2-[[(4-methoxy-3,5-dimethyl-2-pyridinyl)methyl]sulfinyl]-1H-benzimidazole',
      status: 'active',
      image: '/medicines/omeprazole.jpg'
    },
    { 
      id: 6, 
      name: 'Metformin', 
      scientificName: 'N,N-dimethylbiguanide',
      status: 'active',
      image: '/medicines/metformin.jpg'
    },
  ];

  const router = useRouter();

  return (
    <>
      <Flex align='center' justify='space-between' mb={6}>
        <BaseTitle>Medicines</BaseTitle>

        <HStack gap={4}>
          {/* View Mode Toggle */}
          <HStack gap={1} bg="blue.500" p={1} borderRadius="lg">
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'table' ? 'white' : 'blue'}
              bg={viewMode === 'table' ? 'white' : 'transparent'}
              color={viewMode === 'table' ? 'blue.500' : 'white'}
              _hover={{
                bg: viewMode === 'table' ? 'gray.50' : 'blue.600'
              }}
              onClick={() => setViewMode('table')}
              borderRadius="md"
            >
              <MdTableChart size={18} />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'cards' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'cards' ? 'white' : 'blue'}
              bg={viewMode === 'cards' ? 'white' : 'transparent'}
              color={viewMode === 'cards' ? 'blue.500' : 'white'}
              _hover={{
                bg: viewMode === 'cards' ? 'gray.50' : 'blue.600'
              }}
              onClick={() => setViewMode('cards')}
              borderRadius="md"
            >
              <MdGridView size={18} />
            </Button>
          </HStack>

          <BaseBtn onClick={() => router.push('/medicines/create')}>
            Add Medicine
          </BaseBtn>
        </HStack>
      </Flex>

      {/* Conditional Rendering based on view mode */}
      {viewMode === 'table' ? (
        <BaseTable columns={columns} data={data} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {data.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onEdit={() => alert(`Edit ${medicine.name}`)}
              onDelete={() => alert(`Delete ${medicine.name}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
