import { Box, Text, Flex } from '@chakra-ui/react';
import { EmployeeAvatar } from '../system/EmployeeAvatar';
import { MenuButton } from '../system/MenuButton';
import { FiPhone, FiMapPin } from 'react-icons/fi';

export interface EmployeeCardProps {
  name: string;
  phone: string;
  gender?: 'male' | 'female';
  role?: string;
  email?: string
}

export function EmployeeCard({ name, phone, email = '', gender = 'male', role = 'default' }: EmployeeCardProps) {
  return (
    <Box p={6} borderRadius='lg' boxShadow='md' bg='white' position='relative'>
      <Box position='absolute' top={3} right={3} zIndex={1}>
        <MenuButton onEdit={() => {}} onDelete={() => {}} />
      </Box>
      <Flex align='center' gap={4}>
        <EmployeeAvatar name={name} gender={gender} role={role} />
        <Box>
          <Text fontWeight='bold' fontSize='xl' color='gray.800'>
            {name}
          </Text>
          <Text fontSize='xs' mb={2} color='gray.500'>
            {email || 'N/A'}
          </Text>
          <Flex align='center' gap={6}>
            <Flex align='center' gap={1} color='gray.500'>
              <FiPhone />
              <Text fontSize='sm' color='gray.500'>
                {phone || 'N/A'}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
