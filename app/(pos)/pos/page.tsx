'use client';
import React, { useState } from 'react';
import { Box, Flex, VStack, HStack } from '@chakra-ui/react';
import BillSection from '../../../components/pos/BillSection';
import CustomerCard from '../../../components/pos/CustomerCard';
import CurrencyCard from '../../../components/pos/CurrencyCard';
import ProductSelectionCard from '../../../components/pos/ProductSelectionCard';
import { Medicine } from '../../../lib/types';

export default function POSPage() {
  const [selectedItems, setSelectedItems] = useState<Medicine[]>([]);
  return (
    <Box p={6} bg='gray.50' minH='calc(100vh - 80px)'>
      {/* Main Layout */}
      <Flex gap={6} h='calc(100vh - 120px)'>
        {/* Bill Section - 3/4 of screen */}
        <Box flex='3'>
          <BillSection selectedItems={selectedItems} onRemove={() => {}} />
        </Box>

        {/* Right Side - 1/4 of screen */}
        <Box flex='2'>
          <VStack gap={4} align='stretch' h='full'>
            {/* Product Selection Card */}
            <ProductSelectionCard
              onSelect={(product) => {
                // Only add the product if it's not already in the selectedItems array
                const isAlreadySelected = selectedItems.some(item => item.id === product.id);
                if (!isAlreadySelected) {
                  setSelectedItems([...selectedItems, product]);
                }
              }}
              selectedItems={selectedItems}
            />

            {/* Customer Card */}
            <CustomerCard />

            {/* Currency Card */}
            <CurrencyCard />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
