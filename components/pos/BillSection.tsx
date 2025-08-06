'use client';
import React from 'react';
import {
  Box,
  VStack,
  Text,
  Flex,
} from '@chakra-ui/react';

export default function BillSection() {
  return (
    <Box 
      bg="white" 
      borderRadius="lg" 
      p={6} 
      shadow="sm" 
      border="1px" 
      borderColor="gray.200"
      h="calc(100vh - 120px)"
      overflowY="auto"
    >
      <VStack gap={4} align="stretch" h="full">
        {/* Header */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={2}>
            Bill / Invoice
          </Text>
          <Text fontSize="sm" color="gray.500">
            Selected items will appear here
          </Text>
        </Box>

        {/* Empty State */}
        <Flex 
          flex="1" 
          align="center" 
          justify="center" 
          direction="column"
          color="gray.400"
        >
          <Box fontSize="6xl" mb={4}>
            📄
          </Box>
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            Bill is Empty
          </Text>
          <Text fontSize="sm" textAlign="center">
            Add products to start creating the bill
          </Text>
        </Flex>

        {/* Bill Summary Placeholder */}
        <Box 
          bg="gray.50" 
          p={4} 
          borderRadius="md" 
          border="1px" 
          borderColor="gray.200"
        >
          <VStack gap={2} align="stretch">
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Bill Summary
            </Text>
            <Flex justify="space-between">
              <Text fontSize="sm" color="gray.600">Subtotal:</Text>
              <Text fontSize="sm" fontWeight="bold">$0.00</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="sm" color="gray.600">Discount:</Text>
              <Text fontSize="sm" fontWeight="bold" color="red.500">-$0.00</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="md" fontWeight="bold" color="gray.800">Total:</Text>
              <Text fontSize="md" fontWeight="bold" color="green.600">$0.00</Text>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
} 