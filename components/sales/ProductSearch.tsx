import React from 'react';
import {
  Card,
  Text,
  VStack,
  HStack,
  Flex,
  Input,
  Button,
  Badge,
} from '@chakra-ui/react';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onAddToInvoice: (product: Product) => void;
}

export default function ProductSearch({
  searchQuery,
  setSearchQuery,
  products,
  onAddToInvoice,
}: ProductSearchProps) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card.Root bg="white" shadow="md" p={6}>
      <Card.Header pb={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Search for Product
        </Text>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack align="stretch" gap={4}>
          <HStack>
            <Input
              placeholder="Search for medicine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="lg"
            />
            <Button colorPalette="blue" size="lg">
              <FaSearch />
            </Button>
          </HStack>
          
          {searchQuery && (
            <VStack align="stretch" gap={2} maxH="200px" overflowY="auto">
              {filteredProducts.map(product => (
                <Flex
                  key={product.id}
                  justify="space-between"
                  align="center"
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  _hover={{ bg: 'gray.100' }}
                >
                  <VStack align="start" gap={1}>
                    <Text fontWeight="semibold">{product.name}</Text>
                    <HStack>
                      <Text fontSize="sm" color="blue.600" fontWeight="bold">
                        ${product.price}
                      </Text>
                      <Badge colorScheme="green" size="sm">
                        Available: {product.stock}
                      </Badge>
                    </HStack>
                  </VStack>
                  <Button
                    size="sm"
                    colorPalette="green"
                    onClick={() => onAddToInvoice(product)}
                  >
                    <FaPlus />
                  </Button>
                </Flex>
              ))}
            </VStack>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
} 