import { Box, Text, Flex } from '@chakra-ui/react';
import { EmployeeAvatar } from '../system/EmployeeAvatar';

export interface EmployeeCardProps {
  name: string;
  phone: string;
  gender?: 'male' | 'female';
  role?: string;
}

const roleColor: Record<string, string> = {
  admin: 'blue.400',
  manager: 'purple.400',
  staff: 'green.400',
  default: 'gray.300',
};

export function EmployeeCard({
  name,
  phone,
  gender = 'male',
  role = 'default',
}: EmployeeCardProps) {
  const avatarBg = roleColor[role] || roleColor.default;

  return (
    <Box p={6} borderRadius='lg' boxShadow='md' bg='white'>
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
