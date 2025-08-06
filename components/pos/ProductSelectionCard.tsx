'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Select,
} from '@chakra-ui/react';
import ProductSelect from './ProductSelect';

export default function ProductSelectionCard() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock categories - will be replaced with real data later
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'medicines', label: 'Medicines' },
    { value: 'vitamins', label: 'Vitamins' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'cosmetics', label: 'Cosmetics' },
  ];

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

        {/* Product Selection */}
        <ProductSelect
          value={selectedProduct}
          onChange={setSelectedProduct}
          placeholder='Select a product...'
        />

        {/* Quick Actions */}
        <Box>
          <Text fontSize='sm' fontWeight='medium' color='gray.700' mb={2}>
            Quick Actions
          </Text>
          <HStack gap={2} w='full'>
            <Box
              bg='blue.50'
              p={3}
              borderRadius='md'
              border='1px'
              borderColor='blue.200'
              cursor='pointer'
              _hover={{ bg: 'blue.100' }}
              transition='all 0.2s'
              flex='1'
              textAlign='center'
            >
              <Text fontSize='xs' color='blue.600' fontWeight='medium'>
                Scan QR
              </Text>
            </Box>
            <Box
              bg='green.50'
              p={3}
              borderRadius='md'
              border='1px'
              borderColor='green.200'
              cursor='pointer'
              _hover={{ bg: 'green.100' }}
              transition='all 0.2s'
              flex='1'
              textAlign='center'
            >
              <Text fontSize='xs' color='green.600' fontWeight='medium'>
                Recent Items
              </Text>
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
