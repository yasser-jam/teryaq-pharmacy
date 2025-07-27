'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Text,
  VStack,
} from '@chakra-ui/react';
import BaseTitle from '../../components/base/BaseTitle';
import ProductSearch from '../../components/sales/ProductSearch';
import PaymentSection from '../../components/sales/PaymentSection';
import InvoiceDisplay from '../../components/sales/InvoiceDisplay';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('cash');
  const [currency, setCurrency] = useState('USD');
  const [discount, setDiscount] = useState(0);
  const [paymentType, setPaymentType] = useState('cash');
  const [paymentMethod, setPaymentMethod] = useState('cashier_box');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const sampleProducts: Product[] = [
    { id: 1, name: 'Aspirin 500mg', price: 12.50, stock: 100 },
    { id: 2, name: 'Paracetamol 325mg', price: 8.99, stock: 50 },
    { id: 3, name: 'Amoxicillin 500mg', price: 22.50, stock: 75 },
    { id: 4, name: 'Vitamin D3 1000 IU', price: 15.99, stock: 30 },
    { id: 5, name: 'Ibuprofen 400mg', price: 11.25, stock: 80 },
    { id: 6, name: 'Omeprazole 20mg', price: 18.75, stock: 45 },
  ];

  const addToInvoice = (product: Product) => {
    const existingItem = invoiceItems.find(item => item.id === product.id);
    if (existingItem) {
      setInvoiceItems(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      );
    } else {
      setInvoiceItems(items => [
        ...items,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
          price: product.price,
          total: product.price,
        },
      ]);
    }
  };

  const removeFromInvoice = (id: number) => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromInvoice(id);
      return;
    }
    setInvoiceItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      )
    );
  };

  const handleCompleteSale = () => {
    if (invoiceItems.length === 0) {
      alert('Please add items to the invoice before completing the sale.');
      return;
    }
    alert('Sale completed successfully!');
    // Reset invoice after sale
    setInvoiceItems([]);
    setDiscount(0);
    setSearchQuery('');
  };

  return (
    <Box p={6}>
      {/* Header */}
      <VStack align="stretch" gap={2} mb={8}>
        <BaseTitle>Sales & Inventory Management System</BaseTitle>
        <Text color="gray.600" fontSize="md">
          Efficient application for simulating sales operations and inventory management in pharmacy
        </Text>
      </VStack>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
        {/* Left Section - Transaction Form */}
        <VStack align="stretch" gap={6}>
          {/* Product Search Component */}
          <ProductSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={sampleProducts}
            onAddToInvoice={addToInvoice}
          />

          {/* Payment Section Component */}
          <PaymentSection
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            currency={currency}
            setCurrency={setCurrency}
            discount={discount}
            setDiscount={setDiscount}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onCompleteSale={handleCompleteSale}
          />
        </VStack>

        {/* Right Section - Invoice Display */}
        <InvoiceDisplay
          items={invoiceItems}
          discount={discount}
          onRemoveItem={removeFromInvoice}
          onUpdateQuantity={updateQuantity}
        />
      </Grid>
    </Box>
  );
} 