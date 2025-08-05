'use client';
import { useState } from 'react';
import {
  createListCollection,
  Field,
  Portal,
  Select,
  Spinner,
} from '@chakra-ui/react';

interface BaseSelectProps {
  label: string;
  items: Array<any>;
  itemTitle?: string;
  itemValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  register?: ReturnType<any>;
  error?: string;
  placeholder?: string;
  loading?: boolean;
  [x: string]: any;
}

export default function BaseSelect({
  label,
  items,
  itemTitle = 'label',
  itemValue = 'value',
  value,
  onChange,
  register,
  error,
  placeholder = 'Select an option',
  loading = false,
  ...rest
}: BaseSelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const collection = createListCollection({
    items: items.map((item) => ({
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
    <Field.Root invalid={!!error} >
      <Select.Root
        collection={collection}
        {...(register || {})}
      >
        <Select.Label>{label}</Select.Label>
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger paddingX={4} cursor="pointer">
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup paddingX={4}> 
            {loading && (
              <Spinner size='xs' borderWidth='1.5px' color='fg.muted' />
            )}
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content zIndex={9999}>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value} paddingX={4} paddingY={2} cursor="pointer">
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Field.ErrorText>{error}</Field.ErrorText>
    </Field.Root>
  );
}
