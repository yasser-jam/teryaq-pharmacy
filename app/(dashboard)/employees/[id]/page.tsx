'use client';
import React, { use, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EmployeeEditDialog from '../../../../components/employee/EmployeeEditDialog';
import { Employee } from '../../../../lib/schema';
import { api } from '../../../../lib/api';
import { useMutation } from '@tanstack/react-query';

interface EmployeeEditDialogProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: EmployeeEditDialogProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { id } = use(params);
  // Ensure component is mounted on client-side before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const employeeId = id as string;

  const isEdit = employeeId !== 'create';

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
        updateEmployee(data);
      } else {
        createEmployee(data);
      }

      router.replace('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationKey: ['employees-create'],
    mutationFn: async (data: Employee) =>
      await api('/employees', {
        method: 'POST',
        body: {
          ...data,
          workingHours: [],
          pharmacyId: 1702
        },
      }),
    onSuccess: () => {
    },
  });

  const { mutate: updateEmployee, isPending: isUpdating } = useMutation({
    mutationKey: ['employees-update'],
    mutationFn: async (data: Employee) =>
      await api(`/employees/${employeeId}`, {
        method: 'PUT',
        body: data,
      }),
  });

  const handleClose = () => {
    router.replace('/employees');
  };

  return (
    <EmployeeEditDialog
      open={true}
      onClose={handleClose}
      onSubmit={handleSubmit}
      loading={isCreating || isUpdating}
      isEdit={isEdit}
    />
  );
}
