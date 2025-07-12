import { Field, Input } from '@chakra-ui/react';

interface SysFieldProps {
  name: string;
  label: string;
  register: ReturnType<any>;
  error?: string;
  type?: string;
  placeholder?: string;
  [x: string]: any;
}

export default function SysField({
  name,
  label,
  register,
  error,
  type = 'text',
  placeholder,
  ...rest
}: SysFieldProps) {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label htmlFor={name}>{label}</Field.Label>
      <Input
        id={name}
        paddingX={4}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
} 