'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Form, Type } from '../../lib/types';
import BaseSelect from '../base/BaseSelect';

interface SysFormSelectProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
}

export default function SysFormSelect({
  label,
  value,
  onChange,
  register,
  error,    
  placeholder = 'Select Form',
}: SysFormSelectProps) {
  const {
    data: forms,
    isLoading,
    error: queryError,
  } = useQuery<Form[]>({
    queryKey: ['forms'],
    queryFn: () => api('/Forms'),
  });

  return (
    <>
      <BaseSelect
        label={label}
        items={forms || []}
        itemTitle='name'
        itemValue='id'
        register={register}
        loading={isLoading}
        error={error || (queryError as any)?.message}
        placeholder={isLoading ? 'Loading Forms...' : placeholder}
        disabled={isLoading}
      />
    </>
  );
}
