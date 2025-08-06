'use client';
import BaseSelect from '../base/BaseSelect';

interface SysRoleSelectProps {
  label: string;
  value?: string;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
}

export default function SysRoleSelect({
  label,
  register,
  error,
  placeholder = 'Select Role',
}: SysRoleSelectProps) {
  
    const roles = [
    { value: 1, title: 'PLATFORM_ADMIN' },
    { value: 2, title: 'PHARMACY_MANAGER' },
    { value: 3, title: 'PHARMACY_EMPLOYEE' },
    { value: 4, title: 'PHARMACY_TRAINEE' },
  ];

  return (
    <>
      <BaseSelect
        label={label}
        items={roles}
        itemTitle='title'
        itemValue='value'
        register={register}
        error={error}
        placeholder={placeholder}
      />
    </>
  );
}
