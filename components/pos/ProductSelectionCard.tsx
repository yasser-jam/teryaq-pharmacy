'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { Medicine } from '../../lib/types';

interface ProductSelectionCardProps {
  onSelect: (product: Medicine) => void;
  selectedItems?: Medicine[];
}

export default function ProductSelectionCard({ onSelect, selectedItems = [] }: ProductSelectionCardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock products - will be replaced with real data later
  const products: Medicine[] = [
    {
      id: 1,
      tradeName: 'Paracetamol',
      scientificName: 'Acetaminophen',
      concentration: '500mg',
      size: '20 tablets',
      requiresPrescription: false,
      barcodes: ['123456789'],
    },
    {
      id: 2,
      tradeName: 'Amoxicillin',
      scientificName: 'Amoxicillin trihydrate',
      concentration: '250mg',
      size: '12 capsules',
      requiresPrescription: true,
      barcodes: ['987654321'],
    },
    {
      id: 3,
      tradeName: 'Vitamin C',
      scientificName: 'Ascorbic acid',
      concentration: '1000mg',
      size: '30 tablets',
      requiresPrescription: false,
      barcodes: ['456789123'],
    },
    {
      id: 4,
      tradeName: 'Ibuprofen',
      scientificName: 'Ibuprofen',
      concentration: '400mg',
      size: '24 tablets',
      requiresPrescription: false,
      barcodes: ['789123456'],
    },
    {
      id: 5,
      tradeName: 'Omeprazole',
      scientificName: 'Omeprazole magnesium',
      concentration: '20mg',
      size: '14 capsules',
      requiresPrescription: true,
      barcodes: ['321654987'],
    },
    {
      id: 6,
      tradeName: 'Calcium Carbonate',
      scientificName: 'Calcium carbonate',
      concentration: '500mg',
      size: '60 tablets',
      requiresPrescription: false,
      barcodes: ['654987321'],
    },
  ];

  const filteredProducts = products.filter(product =>
    product.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (product: Medicine) => {
    return selectedItems.some(item => item.id === product.id);
  };

  return (
    <Box
      bg='white'
      borderRadius='lg'
      p={4}
      shadow='sm'
      border='1px'
      borderColor='gray.200'
    >
      <VStack gap={4} align='stretch'>
        {/* Header */}
        <Text fontSize='lg' fontWeight='bold' color='gray.800'>
          Product Selection
        </Text>

        {/* Search Input */}
        <Input
          placeholder='Search products...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size='md'
          borderRadius='md'
          padding={2}
        />

        {/* Products Section */}
        <Box
          bg='gray.50'
          borderRadius='md'
          p={3}
          maxH='400px'
          overflowY='auto'
        >
          <VStack gap={2} align='stretch'>
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                bg={isSelected(product) ? 'blue.50' : 'white'}
                p={3}
                borderRadius='md'
                border='1px'
                borderColor={isSelected(product) ? 'blue.200' : 'gray.200'}
                cursor='pointer'
                _hover={{ bg: isSelected(product) ? 'blue.100' : 'gray.50' }}
                transition='all 0.2s'
                onClick={() => onSelect(product)}
              >
                <Flex justify='space-between' align='center'>
                  <HStack gap={3}>
                    <Box
                      w='32px'
                      h='32px'
                      borderRadius='full'
                      bg={isSelected(product) ? 'blue.600' : 'blue.500'}
                      color='white'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      fontSize='sm'
                      fontWeight='bold'
                    >
                      {product.tradeName.charAt(0).toUpperCase()}
                    </Box>
                    <VStack align='start' gap={0}>
                      <Text fontSize='sm' fontWeight='medium' color='gray.800'>
                        {product.tradeName}
                      </Text>
                      <Text fontSize='xs' color='gray.500'>
                        {product.scientificName}
                      </Text>
                    </VStack>
                  </HStack>
                  {product.requiresPrescription && (
                    <Badge colorScheme='red' size='sm'>
                      Requires Prescription
                    </Badge>
                  )}
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* QR Scan Button */}
        <Box
          bg='blue.500'
          p={3}
          borderRadius='md'
          cursor='pointer'
          _hover={{ bg: 'blue.600' }}
          transition='all 0.2s'
          textAlign='center'
          w='full'
        >
          <Text fontSize='sm' color='white' fontWeight='medium'>
            Scan QR Code
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
