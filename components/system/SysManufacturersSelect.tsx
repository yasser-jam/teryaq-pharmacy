'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Manufacturer } from '../../lib/types';
import BaseSelect from '../base/BaseSelect';

interface SysManufacturersSelectProps {
  label: string;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
}

export default function SysManufacturersSelect({
  label,
  register,
  error,
  placeholder = 'Select Manufacturer',
}: SysManufacturersSelectProps) {
  const {
    data: manufacturers,
    isLoading,
    error: queryError,
  } = useQuery<Manufacturer[]>({
    queryKey: ['manufacturers'],
    queryFn: () => api('/manufacturers'),
  });

  return (
    <>
      <BaseSelect
        label={label}
        items={manufacturers || []}
        type='number'
        itemTitle='name'
        itemValue='id'
        register={register}
        loading={isLoading}
        error={error || (queryError as any)?.message}
        placeholder={isLoading ? 'Loading manufacturers...' : placeholder}
        disabled={isLoading}
      />
    </>
  );
}
