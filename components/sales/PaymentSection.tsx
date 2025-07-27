import React from 'react';
import {
  Box,
  Card,
  Text,
  VStack,
  Input,
  Select,
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import BaseBtn from '../base/BaseBtn';

interface PaymentSectionProps {
  selectedCustomer: string;
  setSelectedCustomer: (customer: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  discount: number;
  setDiscount: (discount: number) => void;
  paymentType: string;
  setPaymentType: (type: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onCompleteSale: () => void;
}

export default function PaymentSection({
  selectedCustomer,
  setSelectedCustomer,
  currency,
  setCurrency,
  discount,
  setDiscount,
  paymentType,
  setPaymentType,
  paymentMethod,
  setPaymentMethod,
  onCompleteSale,
}: PaymentSectionProps) {
  const customers = [
    { value: 'cash', label: 'Cash Customer' },
    { value: 'customer1', label: 'John Smith' },
    { value: 'customer2', label: 'Sarah Johnson' },
    { value: 'customer3', label: 'Mike Wilson' },
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
  ];

  const paymentTypes = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'mixed', label: 'Mixed Payment' },
  ];

  const paymentMethods = [
    { value: 'cashier_box', label: 'Cashier Register' },
    { value: 'bank1', label: 'Chase Bank' },
    { value: 'bank2', label: 'Bank of America' },
    { value: 'credit_card', label: 'Credit Card Terminal' },
  ];

  return (
    <Card.Root bg="white" shadow="md" p={6}>
      <Card.Header pb={4}>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Payment & Customer
        </Text>
      </Card.Header>
      <Card.Body pt={0}>
        <VStack align="stretch" gap={4}>
          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Customer
            </Text>
            <Select.Root value={selectedCustomer} onValueChange={(e) => setSelectedCustomer(e.value)}>
              <Select.Trigger>
                <Select.ValueText placeholder="Select Customer" />
              </Select.Trigger>
              <Select.Content>
                {customers.map(customer => (
                  <Select.Item key={customer.value} item={customer.value}>
                    {customer.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Invoice Currency
            </Text>
            <Select.Root value={currency} onValueChange={(e) => setCurrency(e.value)}>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.Content>
                {currencies.map(curr => (
                  <Select.Item key={curr.value} item={curr.value}>
                    {curr.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Discount (%)
            </Text>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              placeholder="0"
            />
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Payment Type
            </Text>
            <Select.Root value={paymentType} onValueChange={(e) => setPaymentType(e.value)}>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.Content>
                {paymentTypes.map(type => (
                  <Select.Item key={type.value} item={type.value}>
                    {type.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <Box>
            <Text mb={2} fontWeight="semibold" color="gray.700">
              Payment Method
            </Text>
            <Select.Root value={paymentMethod} onValueChange={(e) => setPaymentMethod(e.value)}>
              <Select.Trigger>
                <Select.ValueText />
              </Select.Trigger>
              <Select.Content>
                {paymentMethods.map(method => (
                  <Select.Item key={method.value} item={method.value}>
                    {method.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <BaseBtn
            btnProps={{ colorPalette: 'green', size: 'lg' }}
            onClick={onCompleteSale}
          >
            <FaShoppingCart />
            <Text ml={2}>Complete Sale</Text>
          </BaseBtn>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
} 