'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Input,
  Button,
  Badge,
} from '@chakra-ui/react';
import { Medicine } from '../../lib/types';

interface BillSectionProps {
  selectedItems: Medicine[];
  onRemove: (medicineId: number) => void;
}

interface BillItem extends Medicine {
  quantity: number;
}

export default function BillSection({ selectedItems, onRemove }: BillSectionProps) {
  const [billItems, setBillItems] = useState<BillItem[]>([]);

  // Update bill items when selected items change
  React.useEffect(() => {
    const newBillItems = selectedItems.map(item => ({
      ...item,
      quantity: billItems.find(billItem => billItem.id === item.id)?.quantity || 1
    }));
    setBillItems(newBillItems);
  }, [selectedItems]);

  const handleQuantityChange = (medicineId: number, newQuantity: number) => {
    setBillItems(prev => 
      prev.map(item => 
        item.id === medicineId 
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemove = (medicineId: number) => {
    setBillItems(prev => prev.filter(item => item.id !== medicineId));
    onRemove(medicineId);
  };

  const calculateSubtotal = () => {
    return billItems.reduce((total, item) => {
      // Mock price calculation - replace with actual price logic
      const unitPrice = 10; // This should come from the medicine data
      return total + (unitPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = 0; // This can be made configurable
  const total = subtotal - discount;

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
            {billItems.length} item{billItems.length !== 1 ? 's' : ''} selected
          </Text>
        </Box>

        {/* Bill Items */}
        {billItems.length > 0 ? (
          <VStack gap={3} align="stretch" flex="1" overflowY="auto">
            {billItems.map((item) => (
              <Box
                key={item.id}
                bg="gray.50"
                p={4}
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
              >
                <VStack gap={3} align="stretch">
                  {/* Item Header */}
                  <Flex justify="space-between" align="start">
                    <VStack align="start" gap={1} flex="1">
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        {item.tradeName}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.scientificName}
                      </Text>
                      {item.concentration && (
                        <Text fontSize="xs" color="gray.500">
                          {item.concentration} - {item.size}
                        </Text>
                      )}
                    </VStack>
                    {item.requiresPrescription && (
                      <Badge colorScheme="red" size="sm">
                        Requires Prescription
                      </Badge>
                    )}
                  </Flex>

                  {/* Quantity and Actions */}
                  <HStack gap={3} align="center">
                    <VStack align="start" gap={1} flex="1">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Quantity
                      </Text>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        size="sm"
                        w="80px"
                        borderRadius="md"
                      />
                    </VStack>
                    <VStack align="start" gap={1} flex="1">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Unit Price
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        $10.00
                      </Text>
                    </VStack>
                    <VStack align="start" gap={1} flex="1">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Subtotal
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.600">
                        ${(10 * item.quantity).toFixed(2)}
                      </Text>
                    </VStack>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>
        ) : (
          /* Empty State */
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
        )}

        {/* Bill Summary */}
        {billItems.length > 0 && (
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
                <Text fontSize="sm" fontWeight="bold">${subtotal.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontSize="sm" color="gray.600">Discount:</Text>
                <Text fontSize="sm" fontWeight="bold" color="red.500">-${discount.toFixed(2)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.800">Total:</Text>
                <Text fontSize="md" fontWeight="bold" color="green.600">${total.toFixed(2)}</Text>
              </Flex>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
} 