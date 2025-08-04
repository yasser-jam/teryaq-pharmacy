'use client';
import { useState } from 'react';
import { createListCollection, Field, Select } from '@chakra-ui/react';

interface BaseSelectProps {
  name: string;
  label: string;
  items: Array<any>;
  itemTitle?: string;
  itemValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
  [x: string]: any;
}

export default function BaseSelect({
  name,
  label,
  items,
  itemTitle = 'label',
  itemValue = 'value',
  value,
  onChange,
  register,
  error,
  placeholder = 'Select an option',
  ...rest
}: BaseSelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const collection = createListCollection({
    items: items.map(item => ({
      label: item[itemTitle],
      value: item[itemValue],
    })),
  });

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Field.Root invalid={!!error}>
      <Field.Label htmlFor={name}>{label}</Field.Label>
      <Select.Root
        collection={collection}
        value={[selectedValue]}
        onValueChange={(e) => handleValueChange(e.value[0])}
        {...(register && register(name))}
        {...rest}
      >
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
} 