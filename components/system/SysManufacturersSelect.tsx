'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Manufacturer } from '../../lib/types';
import BaseSelect from '../base/BaseSelect';

interface SysManufacturersSelectProps {
  name: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
  [x: string]: any;
}

export default function SysManufacturersSelect({
  name,
  label,
  value,
  onChange,
  register,
  error,
  placeholder = 'Select Manufacturer',
  ...rest
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
        name={name}
        label={label}
        items={manufacturers || []}
        itemTitle='name'
        itemValue='id'
        value={value}
        onChange={onChange}
        register={register}
        loading={isLoading}
        error={error || (queryError as any)?.message}
        placeholder={isLoading ? 'Loading manufacturers...' : placeholder}
        disabled={isLoading}
        {...rest}
      />
    </>
  );
}
