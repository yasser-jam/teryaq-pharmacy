'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Type } from '../../lib/types';
import BaseSelect from '../base/BaseSelect';

interface SysTypeSelectProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
}

export default function SysTypeSelect({
  label,
  value,
  onChange,
  register,
  error,    
  placeholder = 'Select Type',
}: SysTypeSelectProps) {
  const {
    data: types,
    isLoading,
    error: queryError,
  } = useQuery<Type[]>({
    queryKey: ['types'],
    queryFn: () => api('/types'),
  });

  return (
    <>
      <BaseSelect
        label={label}
        items={types || []}
        itemTitle='name'
        itemValue='id'
        register={register}
        loading={isLoading}
        error={error || (queryError as any)?.message}
        placeholder={isLoading ? 'Loading Types...' : placeholder}
        disabled={isLoading}
      />
    </>
  );
}
