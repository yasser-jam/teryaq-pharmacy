'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
} from '@chakra-ui/react';

export default function CurrencyCard() {
  const [currency, setCurrency] = useState<'S.P' | 'USD'>('USD');
  const [paymentMethod, setPaymentMethod] = useState<'BANK' | 'CASH'>('CASH');

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
          Currency & Payment Method
        </Text>

        {/* Currency Selection */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Currency
          </Text>
          <HStack gap={2} w="full">
            <Badge
              colorScheme="blue"
              variant={currency === 'S.P' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setCurrency('S.P')}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              flex="1"
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
            >
              S.P
            </Badge>
            <Badge
              colorScheme="green"
              variant={currency === 'USD' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setCurrency('USD')}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              flex="1"
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
            >
              USD
            </Badge>
          </HStack>
        </Box>

        {/* Payment Method */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
            Payment Method
          </Text>
          <HStack gap={2} w="full">
            <Badge
              colorScheme="blue"
              variant={paymentMethod === 'CASH' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setPaymentMethod('CASH')}
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
              colorScheme="green"
              variant={paymentMethod === 'BANK' ? 'solid' : 'outline'}
              cursor="pointer"
              px={4}
              py={2}
              borderRadius="md"
              onClick={() => setPaymentMethod('BANK')}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              flex="1"
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
            >
              Bank
            </Badge>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
} 