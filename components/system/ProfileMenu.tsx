import { Avatar, Menu, Box } from '@chakra-ui/react';
import React from 'react';

const ProfileMenu: React.FC = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Box cursor="pointer">
        <Avatar.Root size="sm" bg={'blue.400'}>
          <Avatar.Fallback name="Profile" color="white" />
        </Avatar.Root>
      </Box>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content minW="40" p={5} borderRadius="md" boxShadow="lg" bg="white">
        <Menu.Item value="profile">Profile menu (to be defined)</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
);

export default ProfileMenu; 