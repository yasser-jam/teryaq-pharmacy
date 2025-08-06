'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Badge,
} from '@chakra-ui/react';

export default function CustomerCard() {
  const [customerName, setCustomerName] = useState('Cash Customer');
  const [paymentType, setPaymentType] = useState<'CASH' | 'DEBT'>('CASH');

  return (
    <Box 
      bg="white" 
      borderRadius="lg" 
      p={4} 
      shadow="sm" 
      border="1px" 
      borderColor="gray.200"
    >
      <VStack gap={4} align="stretch">
        {/* Header */}
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Customer & Payment
        </Text>

        {/* Customer Name */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Customer Name
          </Text>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            size="sm"
          />
        </Box>

        {/* Payment Type */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Payment Type
          </Text>
          <HStack gap={2} w="full">
            <Badge
              colorScheme="blue"
              variant={paymentType === 'CASH' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setPaymentType('CASH')}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              flex="1"
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
            >
              Cash
            </Badge>
            <Badge
              colorScheme="blue"
              variant={paymentType === 'DEBT' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setPaymentType('DEBT')}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              flex="1"
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
            >
              Debt
            </Badge>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
} 