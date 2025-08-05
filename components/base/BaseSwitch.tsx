import { Box, HStack, Switch, Text } from '@chakra-ui/react';

interface BaseSwitchProps {
  error?: string;
  statusValue: string | boolean;
  setValue: (value: string) => void;
  title?: string;
  subtitle?: string;
}

export default function BaseSwitch({
  error,
  statusValue,
  setValue,
  title = 'Employee Status',
  subtitle  = 'Employee Status',
}: BaseSwitchProps) {
  return (
    <Box
      p={5}
      borderWidth={1}
      borderRadius='lg'
      borderColor={error ? 'red.400' : 'gray.200'}
      bg={error ? 'red.50' : 'gray.50'}
    >
      <HStack justify='space-between' align='center'>
        <Box>
          <Text fontSize='sm' fontWeight='medium' mb={1}>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.600'>
            {subtitle}
          </Text>
        </Box>
        <Switch.Root
          colorPalette={'green'}
          checked={statusValue === 'ACTIVE' || statusValue === true}
          onCheckedChange={(details: any) => {
            setValue(details.checked ? 'ACTIVE' : 'INACTIVE');
          }}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </HStack>
      {error && (
        <Text color='red.500' fontSize='sm' mt={2}>
          {error}
        </Text>
      )}
    </Box>
  );
}
