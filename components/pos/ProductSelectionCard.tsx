'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Select,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export default function ProductSelectionCard() {
  const [searchTerm, setSearchTerm] = useState('');
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

        {/* Product Search */}
        <Box>
          <Text fontSize='sm' fontWeight='medium' color='gray.700' mb={2}>
            Search Product
          </Text>
          <InputGroup>
            <>
              <Box
                position='absolute'
                left={3}
                top='50%'
                transform='translateY(-50%)'
                zIndex={2}
                pointerEvents='none'
              >
                <SearchIcon color='gray.400' />
              </Box>
              <Input
                placeholder='Search by name, barcode, or code...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                pl={8}
              />
            </>
          </InputGroup>
        </Box>

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
