'use client';
import { EmployeeCard } from '../../components/employee/EmployeeCard';

export default function EmployeesPage() {
  const employees = [
    {
      name: 'Alice Johnson',
      phone: '555-1234',
      gender: 'female',
      role: 'staff',
    },
  ];

  return (
    <>
      {employees?.map((el) => (
        <EmployeeCard
          key={el.name}
          name={el.name}
          gender={el.gender as any}
          phone={el.phone}
          role={el.role}
        />
      ))}
    </>
  );
}
