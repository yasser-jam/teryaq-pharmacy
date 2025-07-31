'use client';
import { useState } from 'react';
import { Box, Text, Button, Flex, Input, HStack } from '@chakra-ui/react';
import { MdSearch, MdDelete } from 'react-icons/md';
import BaseTitle from '../../../components/base/BaseTitle';

interface InvoiceItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [discount, setDiscount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const addItemToInvoice = () => {
    if (searchTerm.trim()) {
      const newItem: InvoiceItem = {
        id: Date.now(),
        name: searchTerm,
        quantity: 1,
        price: 50,
        total: 50,
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setSearchTerm('');
    }
  };

  const removeItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setInvoiceItems(invoiceItems.map(item => 
      item.id === id 
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ));
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - (subtotal * discount / 100);
  };

  const completeSale = () => {
    if (invoiceItems.length === 0) {
      alert('الرجاء إضافة منتجات للفاتورة');
      return;
    }
    alert('تم إتمام عملية البيع بنجاح');
    setInvoiceItems([]);
    setDiscount(0);
  };

  return (
    <Box dir="rtl" p={6} bg="gray.50" minH="100vh">
      {/* Header */}
      <Box textAlign="center" mb={8}>
        <BaseTitle>نظام إدارة المبيعات والمخزون</BaseTitle>
        <Text fontSize="lg" color="gray.600" fontWeight="medium" mt={2}>
          تطبيق فعّال لمحاكاة عمليات البيع وإدارة المخزون في الصيدلية
        </Text>
      </Box>

      {/* Main Content */}
      <Flex gap={8} maxW="1400px" mx="auto" direction={{ base: 'column', lg: 'row' }}>
        {/* Left Section - Transaction Form */}
        <Box flex="1">
          <Box bg="white" shadow="lg" borderRadius="xl" p={6}>
            {/* Product Search */}
            <Box mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={3} color="gray.700">
                بحث عن منتج
              </Text>
              <HStack>
                <Input
                  placeholder="اكتب اسم المنتج أو الرمز التعريفي..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                  onKeyPress={(e) => e.key === 'Enter' && addItemToInvoice()}
                />
                <Button
                  colorScheme="teal"
                  onClick={addItemToInvoice}
                  size="lg"
                  px={4}
                >
                  <MdSearch size={20} />
                </Button>
              </HStack>
            </Box>

            <Box h="1px" bg="gray.200" mb={6} />

            {/* Payment and Customer Section */}
            <Box mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
                الدفع والعميل
              </Text>
              
              {/* Customer */}
              <Box mb={4}>
                <Text fontSize="md" fontWeight="medium" mb={2} color="gray.600">
                  العميل
                </Text>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Text>عميل نقدي</Text>
                </Box>
              </Box>

              {/* Currency */}
              <Box mb={4}>
                <Text fontSize="md" fontWeight="medium" mb={2} color="gray.600">
                  عملة الفاتورة
                </Text>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Text>ليرة سورية (ل.س.)</Text>
                </Box>
              </Box>

              {/* Discount */}
              <Box mb={4}>
                <Text fontSize="md" fontWeight="medium" mb={2} color="gray.600">
                  الخصم (%)
                </Text>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  min={0}
                  max={100}
                  size="lg"
                />
              </Box>

              {/* Payment Type */}
              <Box mb={4}>
                <Text fontSize="md" fontWeight="medium" mb={2} color="gray.600">
                  نوع الدفع
                </Text>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Text>نقدي</Text>
                </Box>
              </Box>

              {/* Payment Method */}
              <Box mb={4}>
                <Text fontSize="md" fontWeight="medium" mb={2} color="gray.600">
                  وسيلة الدفع
                </Text>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Text>صندوق الكاشر</Text>
                </Box>
              </Box>
            </Box>

            {/* Complete Sale Button */}
            <Button
              colorScheme="teal"
              size="lg"
              onClick={completeSale}
              fontSize="lg"
              fontWeight="bold"
              py={6}
              w="full"
            >
              إتمام عملية البيع
            </Button>
          </Box>
        </Box>

        {/* Right Section - Invoice */}
        <Box flex="1">
          <Box bg="white" shadow="lg" borderRadius="xl" p={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.700" textAlign="center" mb={4}>
              فاتورة البيع
            </Text>

            {invoiceItems.length === 0 ? (
              <Flex h="400px" align="center" justify="center" direction="column">
                <Text fontSize="xl" color="gray.400" fontWeight="medium" mb={2}>
                  الفاتورة فارغة
                </Text>
                <Text fontSize="md" color="gray.400" textAlign="center">
                  ابحث عن المنتجات وأضفها لبدء إنشاء الفاتورة
                </Text>
              </Flex>
            ) : (
              <Box>
                {/* Invoice Items */}
                <Box mb={4}>
                  {invoiceItems.map((item) => (
                    <Box key={item.id} border="1px" borderColor="gray.200" borderRadius="md" p={3} mb={2}>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Text fontWeight="medium" mb={1}>{item.name}</Text>
                          <HStack>
                            <Text fontSize="sm" color="gray.600">الكمية:</Text>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                              min={1}
                              size="sm"
                              w="60px"
                            />
                          </HStack>
                        </Box>
                        <Box textAlign="right">
                          <Text fontSize="sm" color="gray.600" mb={1}>
                            {item.price.toFixed(2)} ل.س.
                          </Text>
                          <Text fontWeight="bold" mb={1}>
                            {item.total.toFixed(2)} ل.س.
                          </Text>
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                          >
                            <MdDelete />
                          </Button>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </Box>

                <Box h="1px" bg="gray.200" mb={4} />

                {/* Invoice Summary */}
                <Box>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="md" color="gray.600">المجموع الفرعي:</Text>
                    <Text fontSize="md" fontWeight="bold">
                      {calculateSubtotal().toFixed(2)} ل.س.
                    </Text>
                  </HStack>
                  
                  {discount > 0 && (
                    <HStack justify="space-between" mb={3}>
                      <Text fontSize="md" color="gray.600">الخصم ({discount}%):</Text>
                      <Text fontSize="md" color="red.500" fontWeight="bold">
                        -{(calculateSubtotal() * discount / 100).toFixed(2)} ل.س.
                      </Text>
                    </HStack>
                  )}
                  
                  <Box h="1px" bg="gray.200" mb={3} />
                  
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold" color="teal.600">المجموع الكلي:</Text>
                    <Text fontSize="lg" fontWeight="bold" color="teal.600">
                      {calculateTotal().toFixed(2)} ل.س.
                    </Text>
                  </HStack>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}