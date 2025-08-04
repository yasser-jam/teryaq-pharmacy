'use client';
import { useState } from 'react';
import { createListCollection, Field, Select } from '@chakra-ui/react';

export default function SysSizeSelect({ value, setValue }: { value: string; setValue: (value: string) => void }) {

  const sizes = createListCollection({
    items: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
  });

  return (
    <Field.Root>
      <Field.Label htmlFor='size'>Size</Field.Label>
      <Select.Root
        collection={sizes}
        value={[value]}
        onValueChange={(e) => setValue(e.value[0])}
      >
        <Select.Trigger>
          <Select.ValueText placeholder='Select Size' />
        </Select.Trigger>
        <Select.Content>
          {sizes.items.map((size) => (
            <Select.Item key={size.value} item={size}>
              {size.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Field.Root>
  );
}
