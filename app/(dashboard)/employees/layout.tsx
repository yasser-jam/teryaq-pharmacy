'use client';

import { SimpleGrid, Heading, Flex, Button } from '@chakra-ui/react';
import { EmployeeCard } from '../../../components/employee/EmployeeCard';
import BaseBtn from '../../../components/base/BaseBtn';
import BaseTitle from '../../../components/base/BaseTitle';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/api';
import { Employee } from '../../../lib/types';

export default function Layout({ children }: { children: React.ReactNode }) {

  const { data:employees } = useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: () => api('/employees'),
  })

  const router = useRouter()

  return (
    <>
      <Flex align='center' justify='space-between' mb={6}>
        <BaseTitle>Employees</BaseTitle>

        <BaseBtn onClick={() => router.push('/employees/create')}>Add Employee</BaseBtn>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} gap={6}>
        {employees?.map((emp) => (
          <EmployeeCard
            key={emp.id}
            name={emp.firstName + ' ' + emp.lastName}
            phone={emp.phoneNumber}
            email={emp.email}
            role={emp.role ?? ''}
          />
        ))}
      </SimpleGrid>

      {children}
    </>
  );
}
