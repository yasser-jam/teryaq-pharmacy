'use client';
import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Select,
  Avatar,
  Portal,
  createListCollection,
} from '@chakra-ui/react';
import BaseBadge from '../base/BaseBadge';

interface Medicine {
  id: number;
  tradeName: string;
  scientificName: string;
  type: string;
  image?: string;
}

interface ProductSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

// Create the medicine collection
const medicines = createListCollection({
  items: [
    {
      id: 1,
      tradeName: 'Aspirin',
      scientificName: 'Acetylsalicylic acid',
      type: 'Tablet',
      image: '/medicines/aspirin.jpg',
    },
    {
      id: 2,
      tradeName: 'Ibuprofen',
      scientificName: 'Isobutylphenylpropanoic acid',
      type: 'Capsule',
      image: '/medicines/ibuprofen.jpg',
    },
    {
      id: 3,
      tradeName: 'Amoxicillin',
      scientificName: 'Amoxicillin trihydrate',
      type: 'Suspension',
      image: '/medicines/amoxicillin.jpg',
    },
    {
      id: 4,
      tradeName: 'Paracetamol',
      scientificName: 'N-acetyl-para-aminophenol',
      type: 'Tablet',
      image: '/medicines/paracetamol.jpg',
    },
    {
      id: 5,
      tradeName: 'Omeprazole',
      scientificName: '5-methoxy-2-[[(4-methoxy-3,5-dimethyl-2-pyridinyl)methyl]sulfinyl]-1H-benzimidazole',
      type: 'Capsule',
      image: '/medicines/omeprazole.jpg',
    },
  ],
  itemToString: (item) => item.tradeName,
  itemToValue: (item) => item.id.toString(),
});

// Custom value display component
const SelectValue = ({ value }: { value?: string }) => {
  if (!value) {
    return <Select.ValueText placeholder="Select a product..." />;
  }
  
  const selectedMedicine = medicines.items.find(m => m.id.toString() === value);
  if (!selectedMedicine) {
    return <Select.ValueText placeholder="Select a product..." />;
  }
  
  return (
    <Select.ValueText placeholder="Select a product..." px={3}>
      <VStack align="start" gap={0} flex="1">
        <Text fontSize="sm" fontWeight="medium" color="gray.800">
          {selectedMedicine.tradeName}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {selectedMedicine.scientificName}
        </Text>
      </VStack>
    </Select.ValueText>
  );
};

export default function ProductSelect({
  value,
  onChange,
  placeholder = 'Select a product...',
}: ProductSelectProps) {
  return (
    <Box>
      <Text fontSize='sm' fontWeight='medium' color='gray.700' mb={2}>
        Select Product
      </Text>
      
      <Select.Root
        collection={medicines}
        value={value ? [value] : []}
        onValueChange={(details) => {
          const newValue = details.value[0];
          onChange?.(newValue);
        }}
        size="md"
        width="100%"
      >
        <Select.HiddenSelect />
        <Select.Label>Select Product</Select.Label>
        <Select.Control>
                     <Select.Trigger>
             <SelectValue value={value} />
           </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {medicines.items.map((medicine) => (
                                 <Select.Item item={medicine} key={medicine.id} justifyContent="flex-start" px={3}>
                   <VStack align="start" gap={1} flex="1">
                     <Text fontSize="sm" fontWeight="medium" color="gray.800">
                       {medicine.tradeName}
                     </Text>
                     <Text fontSize="xs" color="gray.500">
                       {medicine.scientificName}
                     </Text>
                   </VStack>
                   <Select.ItemIndicator />
                 </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
} 