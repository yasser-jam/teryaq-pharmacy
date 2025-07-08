import { Box, Text, Flex } from '@chakra-ui/react';
import { EmployeeAvatar } from '../system/EmployeeAvatar';
import { MenuButton } from '../system/MenuButton';

export interface EmployeeCardProps {
  name: string;
  phone: string;
  gender?: 'male' | 'female';
  role?: string;
}

export function EmployeeCard({ name, phone, gender = 'male', role = 'default' }: EmployeeCardProps) {
  return (
    <Box p={6} borderRadius='lg' boxShadow='md' bg='white' position='relative'>
      <Box position='absolute' top={3} right={3} zIndex={1}>
        <MenuButton onEdit={() => {}} onDelete={() => {}} />
      </Box>
      <Flex align='center' gap={4}>
        <EmployeeAvatar name={name} gender={gender} role={role} />
        <Box>
          <Text fontWeight='bold' fontSize='xl' mb={1} color='gray.800'>
            {name}
          </Text>
          <Text fontSize='sm' color='gray.500'>
            {phone}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
