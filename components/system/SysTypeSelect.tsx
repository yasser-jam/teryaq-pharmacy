'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { Type } from '../../lib/types';
import BaseSelect from '../base/BaseSelect';

interface SysTypeSelectProps {
  name: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
  [x: string]: any;
}

export default function SysTypeSelect({
  name,
  label,
  value,
  onChange,
  register,
  error,    
  placeholder = 'Select Type',
  ...rest
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
        name={name}
        label={label}
        items={types || []}
        itemTitle='name'
        itemValue='id'
        value={value}
        onChange={onChange}
        register={register}
        loading={isLoading}
        error={error || (queryError as any)?.message}
        placeholder={isLoading ? 'Loading Types...' : placeholder}
        disabled={isLoading}
        {...rest}
      />
    </>
  );
}
