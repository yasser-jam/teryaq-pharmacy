import React from 'react';
import {
  Card,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  Separator,
  Table,
} from '@chakra-ui/react';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceDisplayProps {
  items: InvoiceItem[];
  discount: number;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export default function InvoiceDisplay({
  items,
  discount,
  onRemoveItem,
  onUpdateQuantity,
}: InvoiceDisplayProps) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <Card.Root bg="white" shadow="md" h="fit-content" p={6}>
      <Card.Header pb={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Sales Invoice
        </Text>
      </Card.Header>
      <Card.Body pt={0}>
        {items.length === 0 ? (
          <Flex
            justify="center"
            align="center"
            h="200px"
            direction="column"
            gap={4}
            color="gray.500"
          >
            <FaShoppingCart size={48} />
            <Text fontSize="lg">Invoice is Empty</Text>
            <Text fontSize="sm" textAlign="center">
              Search for products and add them to the invoice
            </Text>
          </Flex>
        ) : (
          <VStack align="stretch" gap={4}>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader textAlign="left">Product</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Quantity</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Price</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Total</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map(item => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="left" fontWeight="semibold">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <HStack justify="center" gap={1}>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Text minW="40px" textAlign="center">
                          {item.quantity}
                        </Text>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      ${item.price}
                    </Table.Cell>
                    <Table.Cell textAlign="center" fontWeight="bold" color="blue.600">
                      ${item.total}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        size="xs"
                        colorPalette="red"
                        variant="outline"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>

            <Separator />

            <VStack align="stretch" gap={2}>
              <HStack justify="space-between">
                <Text fontWeight="semibold">Subtotal:</Text>
                <Text fontWeight="bold">${subtotal.toFixed(2)}</Text>
              </HStack>
              
              {discount > 0 && (
                <HStack justify="space-between" color="red.600">
                  <Text fontWeight="semibold">Discount ({discount}%):</Text>
                  <Text fontWeight="bold">-${discountAmount.toFixed(2)}</Text>
                </HStack>
              )}
              
              <Separator />
              
              <HStack justify="space-between" fontSize="lg">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold" color="green.600" fontSize="xl">
                  ${total.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
} 