import { Field, Input } from '@chakra-ui/react';

interface SysFieldProps {
  label: string;
  register: ReturnType<any>;
  error?: string;
  type?: string;
  placeholder?: string;
}

export default function SysField({
  label,
  register,
  error,
  type = 'text',
  placeholder,
}: SysFieldProps) {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label htmlFor={register?.name}>{label}</Field.Label>
      <Input
        id={register?.name}
        paddingX={4}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
} 