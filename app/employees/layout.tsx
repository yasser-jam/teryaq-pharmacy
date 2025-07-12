'use client';

import { SimpleGrid, Heading, Flex, Button } from '@chakra-ui/react';
import { EmployeeCard } from '../../components/employee/EmployeeCard';
import BaseBtn from '../../components/base/BaseBtn';
import BaseTitle from '../../components/base/BaseTitle';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const employees = [
    {
      name: 'Alice Johnson',
      phone: '555-1234',
      gender: 'female',
      role: 'manager',
      address: 'Downtown',
    },
    {
      name: 'Bob Smith',
      phone: '555-5678',
      gender: 'male',
      role: 'admin',
      address: 'Uptown',
    },
    {
      name: 'Charlie Brown',
      phone: '555-8765',
      gender: 'male',
      role: 'staff',
      address: 'Midtown',
    },
    {
      name: 'Diana Prince',
      phone: '555-4321',
      gender: 'female',
      role: 'staff',
      address: 'Harbor',
    },
  ];

  const router = useRouter()

  return (
    <>
      <Flex align='center' justify='space-between' mb={6}>
        <BaseTitle>Employees</BaseTitle>

        <BaseBtn onClick={() => router.push('/employees/create')}>Add Employee</BaseBtn>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} gap={6}>
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.name}
            name={emp.name}
            phone={emp.phone}
            gender={emp.gender as any}
            role={emp.role}
            address={emp.address}
          />
        ))}
      </SimpleGrid>

      {children}
    </>
  );
}
