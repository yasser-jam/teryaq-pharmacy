'use client';
import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
} from '@chakra-ui/react';
import BillSection from '../../../components/pos/BillSection';
import CustomerCard from '../../../components/pos/CustomerCard';
import CurrencyCard from '../../../components/pos/CurrencyCard';
import ProductSelectionCard from '../../../components/pos/ProductSelectionCard';

export default function POSPage() {
  return (
    <Box p={6} bg="gray.50" minH="calc(100vh - 80px)">
      {/* Main Layout */}
      <Flex gap={6} h="calc(100vh - 120px)">
        {/* Bill Section - 3/4 of screen */}
        <Box flex="3">
          <BillSection />
        </Box>

        {/* Right Side - 1/4 of screen */}
        <Box flex="1">
          <VStack gap={4} align="stretch" h="full">
            {/* Product Selection Card */}
            <ProductSelectionCard />
            
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
