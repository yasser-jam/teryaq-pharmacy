'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EmployeeEditDialog from '../../../../components/employee/EmployeeEditDialog';
import { Employee } from '../../../../lib/schema';
import { api } from '../../../../lib/api';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted on client-side before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent SSR/hydration mismatch
  }

  const employeeId = params?.id as string;
  
  // Determine if this is edit mode (id !== 'new') or add mode (id === 'new')
  const isEdit = employeeId !== 'new';
  
  // TODO: Fetch employee data if editing
  // const [employee, setEmployee] = React.useState<Employee | null>(null);
  
  // React.useEffect(() => {
  //   if (isEdit) {
  //     // Fetch employee data
  //     api(`/employees/${employeeId}`)
  //       .then(setEmployee)
  //       .catch(console.error);
  //   }
  // }, [employeeId, isEdit]);

  const handleSubmit = async (data: Employee) => {
    try {
      if (isEdit) {
        // Update employee
        await api(`/employees/${employeeId}`, {
          method: 'PUT',
          body: data,
        });
        console.log('Employee updated:', data);
      } else {
        // Create new employee
        await api('/employees', {
          method: 'POST',
          body: data,
        });
        console.log('Employee created:', data);
      }
      
      // Navigate back to employees list
      router.replace('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleClose = () => {
    router.replace('/employees');
  };

  return (
    <EmployeeEditDialog
      open={true}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isEdit={isEdit}
      // employee={employee} // Pass employee data when editing
    />
  );
}
