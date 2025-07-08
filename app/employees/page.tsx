'use client';
import { SimpleGrid } from '@chakra-ui/react';
import { EmployeeCard } from '../../components/employee/EmployeeCard';

export default function EmployeesPage() {
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

  return (
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
  );
}
