import {
  Avatar,
  Menu,
  Box,
  Flex,
  Text,
  Badge,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FiPhone, FiLogOut, FiGlobe } from 'react-icons/fi';
import React from 'react';
import { EmployeeAvatar } from './EmployeeAvatar';
import RoleBadge from './RoleBadge';

// Example user data (replace with real data as needed)
const user = {
  name: 'John Doe',
  phone: '+1 555-1234',
  role: 'Admin',
  roleColor: 'blue',
};

const ProfileMenu: React.FC = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Box cursor='pointer'>
        <EmployeeAvatar name={user.name} />
      </Box>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content
        minW='72'
        p={5}
        borderRadius='md'
        boxShadow='lg'
        bg='white'
        position='relative'
      >
        {/* User Info Section */}
        <Box position='relative' mb={2}>
          <Flex align='center' gap={3}>
            <EmployeeAvatar name={user.name} />

            <Box>
              <Text fontWeight='bold' fontSize='lg'>
                {user.name}
              </Text>
              <Flex align='center' gap={1} color='gray.500' fontSize='sm'>
                <FiPhone />
                <Text>{user.phone}</Text>
              </Flex>
            </Box>
          </Flex>
          <RoleBadge role={user.role} color='blue.500' />
        </Box>

        <Box my={2} height='1px' width='100%' marginY={4} bg='gray.200' />

        {/* Actions Section */}
        <Flex align='center' gap={2}>
          <Button
            colorScheme='red'
            paddingX={4}
            paddingY={2}
            variant='outline'
            color={'red.500'}
            borderColor={'red.500'}
            size='sm'
            flexGrow={1}
          >
            <FiLogOut style={{ marginRight: 4 }} /> Logout
          </Button>

          <IconButton
            aria-label='Change language'
            variant='solid'
            colorScheme='blue'
            size='sm'
          >
            <FiGlobe />
          </IconButton>
        </Flex>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
);

export default ProfileMenu;
