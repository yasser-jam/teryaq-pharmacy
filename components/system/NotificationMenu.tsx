import { IconButton, Menu, Box } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import React from 'react';

interface NotificationMenuProps {
  hasNotifications?: boolean;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({ hasNotifications = true }) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Box position="relative">
        <IconButton
          aria-label="Notifications"
          variant="ghost"
          color="gray.700"
          _hover={{ bg: 'gray.100', color: 'blue.600' }}
        >
          <BellIcon boxSize={6} />
        </IconButton>
        {hasNotifications && (
          <Box
            position="absolute"
            top={1}
            right={1}
            boxSize={2.5}
            bg="red.500"
            borderRadius="full"
            border="2px solid white"
            zIndex={1}
          />
        )}
      </Box>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content minW="40" p={2} borderRadius="md" boxShadow="lg" bg="white">
        <Menu.Item value="none">No new notifications</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
);

export default NotificationMenu; 