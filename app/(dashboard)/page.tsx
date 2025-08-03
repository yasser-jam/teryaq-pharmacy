'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  Text,
  VStack,
  HStack,
  Flex,
  Badge,
  Button,
  Table,
  Stat,
  Alert,
  Separator,
  IconButton,
} from '@chakra-ui/react';
import {
  FaPills,
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaChartLine,
  FaFileInvoice,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaClock,
  FaEye,
  FaBell,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaWarehouse,
} from 'react-icons/fa';
import { useColorModeValue } from '../../components/ui/color-mode';
import BaseBtn from '../../components/base/BaseBtn';
import Link from 'next/link';

// Sample data - replace with real API calls
const statsData = {
  todaySales: 15750.50,
  todayPurchases: 8900.00,
  stockValue: 125000.00,
  lowStockItems: 12,
  presentEmployees: 8,
  cashBalance: 25600.75,
  pendingPayments: 5,
  invoicesToday: 23,
};

const attendanceData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    checkIn: '08:00 AM',
    checkOut: '06:00 PM',
    hours: '10h',
    status: 'Present',
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    checkIn: '09:15 AM',
    checkOut: '-',
    hours: '6h 45m',
    status: 'Present',
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    checkIn: '08:30 AM',
    checkOut: '05:30 PM',
    hours: '9h',
    status: 'Present',
  },
  {
    id: 4,
    name: 'John Smith',
    checkIn: '09:45 AM',
    checkOut: '-',
    hours: '6h 15m',
    status: 'Late',
  },
];



const activityData = [
  {
    id: 1,
    type: 'sale',
    description: 'Medicine sold - Invoice #INV-2024-001',
    amount: '+$125.00',
    time: '2:30 PM',
  },
  {
    id: 2,
    type: 'purchase',
    description: 'Stock received from MediCorp Ltd',
    amount: '-$850.00',
    time: '1:15 PM',
  },
  {
    id: 3,
    type: 'attendance',
    description: 'John Smith checked in (Late)',
    amount: '',
    time: '9:45 AM',
  },
  {
    id: 4,
    type: 'stock',
    description: 'Stock updated - Vitamin D3',
    amount: '',
    time: '8:30 AM',
  },
];

const quickNavItems = [
  {
    title: 'Sell Medicine',
    icon: <FaPills />,
    href: '/sales',
    color: 'green',
    description: 'Process medicine sales',
  },
  {
    title: 'Purchase Medicine',
    icon: <FaShoppingCart />,
    href: '/purchases',
    color: 'blue',
    description: 'Manage inventory purchases',
  },
  {
    title: 'Stock Management',
    icon: <FaBoxes />,
    href: '/stock',
    color: 'purple',
    description: 'Monitor inventory levels',
  },
  {
    title: 'Employees',
    icon: <FaUsers />,
    href: '/employees',
    color: 'orange',
    description: 'Manage staff information',
  },
  {
    title: 'Reports',
    icon: <FaChartLine />,
    href: '/reports',
    color: 'teal',
    description: 'View analytics & reports',
  },
  {
    title: 'Invoices / Receipts',
    icon: <FaFileInvoice />,
    href: '/invoices',
    color: 'red',
    description: 'Manage billing documents',
  },
  {
    title: 'Medicine Management',
    icon: <FaPills />,
    href: '/medicines',
    color: 'cyan',
    description: 'Manage medicine catalog',
  },
  {
    title: 'Attendance & Shifts',
    icon: <FaCalendarAlt />,
    href: '/attendance',
    color: 'pink',
    description: 'Track employee attendance',
  },
];

const StatCard = ({ title, value, icon, change, changeType }: any) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Card.Root bg={bg} border="1px solid" borderColor={borderColor} p={6}>
      <Card.Body>
        <Flex justify="space-between" align="flex-start">
          <VStack align="flex-start" gap={2}>
            <Text fontSize="sm" color="gray.500" fontWeight="medium">
              {title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {value}
            </Text>
            {change && (
              <HStack>
                {changeType === 'up' ? (
                  <FaArrowUp color="green" size={12} />
                ) : (
                  <FaArrowDown color="red" size={12} />
                )}
                <Text fontSize="sm" color={changeType === 'up' ? 'green.500' : 'red.500'}>
                  {change}
                </Text>
              </HStack>
            )}
          </VStack>
          <Box p={3} borderRadius="lg" bg="gray.50">
            {icon}
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

const QuickNavCard = ({ title, icon, href, color, description }: any) => {
  const bg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Link href={href}>
      <Card.Root
        bg={bg}
        border="1px solid"
        borderColor="gray.200"
        _hover={{ bg: hoverBg, transform: 'translateY(-2px)', shadow: 'md' }}
        transition="all 0.2s"
        cursor="pointer"
        h="full"
      >
        <Card.Body p={6}>
          <VStack gap={4}>
            <Box
              p={4}
              borderRadius="xl"
              bg={`${color}.100`}
              color={`${color}.600`}
              fontSize="2xl"
            >
              {icon}
            </Box>
            <VStack gap={1}>
              <Text fontWeight="bold" textAlign="center">
                {title}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                {description}
              </Text>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

const getStatusBadge = (status: string) => {
  const colors = {
    Present: { bg: 'green.100', color: 'green.700' },
    Late: { bg: 'orange.100', color: 'orange.700' },
    Absent: { bg: 'red.100', color: 'red.700' },
  };

  const statusColor = colors[status as keyof typeof colors] || colors.Present;

  return (
    <Badge bg={statusColor.bg} color={statusColor.color} px={2} py={1} borderRadius="md">
      {status}
    </Badge>
  );
};



const getActivityIcon = (type: string) => {
  switch (type) {
    case 'sale':
      return <FaDollarSign color="green" />;
    case 'purchase':
      return <FaShoppingCart color="blue" />;
    case 'attendance':
      return <FaClock color="orange" />;
    case 'stock':
      return <FaWarehouse color="purple" />;
    default:
      return <FaBell />;
  }
};

export default function HomePage() {
  const bg = useColorModeValue('#F8F9FA', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bg}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Box>
          <Text fontSize="3xl" fontWeight="bold" mb={2}>
            Dashboard
          </Text>
          <Text color="gray.600">
            Welcome back! Here's what's happening in your pharmacy today.
          </Text>
        </Box>

        {/* Quick Navigation */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            🔗 Quick Navigation
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
            {quickNavItems.map((item, index) => (
              <QuickNavCard key={index} {...item} />
            ))}
          </Grid>
        </Box>

        {/* Dashboard Stats */}
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            📊 Dashboard Stats
          </Text>
          <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={4}>
            <StatCard
              title="💸 Total Sales Today"
              value={`$${statsData.todaySales.toLocaleString()}`}
              icon={<FaChartLine color="green" />}
              change="+12.5%"
              changeType="up"
            />
            <StatCard
              title="🛒 Total Purchases Today"
              value={`$${statsData.todayPurchases.toLocaleString()}`}
              icon={<FaShoppingCart color="blue" />}
              change="-3.2%"
              changeType="down"
            />
            <StatCard
              title="📦 Current Stock Value"
              value={`$${statsData.stockValue.toLocaleString()}`}
              icon={<FaBoxes color="purple" />}
              change="+5.8%"
              changeType="up"
            />
            <StatCard
              title="⚖️ Low Stock Items"
              value={statsData.lowStockItems}
              icon={<FaExclamationTriangle color="orange" />}
            />
            <StatCard
              title="👥 Employees Present"
              value={`${statsData.presentEmployees}/12`}
              icon={<FaUsers color="teal" />}
            />
            <StatCard
              title="💰 Cash Balance"
              value={`$${statsData.cashBalance.toLocaleString()}`}
              icon={<FaDollarSign color="green" />}
              change="+8.3%"
              changeType="up"
            />
            <StatCard
              title="📆 Pending Payments"
              value={statsData.pendingPayments}
              icon={<FaFileInvoice color="red" />}
            />
            <StatCard
              title="🧾 Invoices Today"
              value={statsData.invoicesToday}
              icon={<FaFileInvoice color="blue" />}
              change="+15.2%"
              changeType="up"
            />
          </Grid>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Enhanced Attendance Table */}
          <Box>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="xl" fontWeight="bold">
                👨‍💼 Employee Attendance Today
              </Text>
              <BaseBtn variant="outline" btnProps={{ colorPalette: 'blue' }}>
                <FaEye />
                <Text ml={2}>View Full Attendance</Text>
              </BaseBtn>
            </Flex>
            <Card.Root bg={cardBg} shadow="lg" borderRadius="xl" overflow="hidden">
              <Card.Body p={0}>
                <Table.Root>
                  <Table.Header bg="gray.50">
                    <Table.Row>
                      <Table.ColumnHeader 
                        px={6} 
                        py={4} 
                        fontSize="sm" 
                        fontWeight="bold" 
                        color="gray.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Employee
                      </Table.ColumnHeader>
                      <Table.ColumnHeader 
                        px={6} 
                        py={4} 
                        fontSize="sm" 
                        fontWeight="bold" 
                        color="gray.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Check-in
                      </Table.ColumnHeader>
                      <Table.ColumnHeader 
                        px={6} 
                        py={4} 
                        fontSize="sm" 
                        fontWeight="bold" 
                        color="gray.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Check-out
                      </Table.ColumnHeader>
                      <Table.ColumnHeader 
                        px={6} 
                        py={4} 
                        fontSize="sm" 
                        fontWeight="bold" 
                        color="gray.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Hours
                      </Table.ColumnHeader>
                      <Table.ColumnHeader 
                        px={6} 
                        py={4} 
                        fontSize="sm" 
                        fontWeight="bold" 
                        color="gray.700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Status
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {attendanceData.map((employee, index) => (
                      <Table.Row 
                        key={employee.id}
                        bg={index % 2 === 0 ? 'white' : 'gray.25'}
                        _hover={{ bg: 'blue.50', transition: 'background 0.2s' }}
                      >
                        <Table.Cell px={6} py={5}>
                          <Text fontWeight="semibold" color="gray.800">
                            {employee.name}
                          </Text>
                        </Table.Cell>
                        <Table.Cell px={6} py={5}>
                          <HStack>
                            <Box 
                              w={2} 
                              h={2} 
                              borderRadius="full" 
                              bg="green.400"
                            />
                            <Text fontWeight="medium" color="gray.700">
                              {employee.checkIn}
                            </Text>
                          </HStack>
                        </Table.Cell>
                        <Table.Cell px={6} py={5}>
                          {employee.checkOut === '-' ? (
                            <HStack>
                              <Box 
                                w={2} 
                                h={2} 
                                borderRadius="full" 
                                bg="orange.400"
                              />
                              <Text fontWeight="medium" color="gray.500">
                                Still working
                              </Text>
                            </HStack>
                          ) : (
                            <HStack>
                              <Box 
                                w={2} 
                                h={2} 
                                borderRadius="full" 
                                bg="red.400"
                              />
                              <Text fontWeight="medium" color="gray.700">
                                {employee.checkOut}
                              </Text>
                            </HStack>
                          )}
                        </Table.Cell>
                        <Table.Cell px={6} py={5}>
                          <Text fontWeight="bold" color="blue.600">
                            {employee.hours}
                          </Text>
                        </Table.Cell>
                        <Table.Cell px={6} py={5}>
                          {getStatusBadge(employee.status)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* Activity Timeline - Now Full Width */}
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={6}>
              📅 Today's Activity Timeline
            </Text>
            <VStack gap={4} align="stretch">
              {activityData.map((activity) => (
                <Card.Root 
                  key={activity.id} 
                  bg={cardBg} 
                  border="1px solid" 
                  borderColor="gray.200"
                  shadow="sm"
                  _hover={{ shadow: 'md', transform: 'translateY(-1px)', transition: 'all 0.2s' }}
                >
                  <Card.Body p={5}>
                    <HStack gap={4} align="center">
                      <Box p={3} borderRadius="lg" bg="gray.50">
                        {getActivityIcon(activity.type)}
                      </Box>
                      <VStack align="flex-start" gap={1} flex={1}>
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                          {activity.description}
                        </Text>
                        <Text fontSize="xs" color="gray.500" fontWeight="medium">
                          {activity.time}
                        </Text>
                      </VStack>
                      {activity.amount && (
                        <Badge
                          bg={activity.amount.startsWith('+') ? 'green.100' : 'red.100'}
                          color={activity.amount.startsWith('+') ? 'green.700' : 'red.700'}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontWeight="bold"
                          fontSize="sm"
                        >
                          {activity.amount}
                        </Badge>
                      )}
                    </HStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
}
