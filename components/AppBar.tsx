'use client';
import { Flex, Heading, IconButton, Text, Badge, Box } from '@chakra-ui/react';
import { HamburgerIcon, BellIcon } from '@chakra-ui/icons';
import React from 'react';
import { Avatar, Menu, Flex as ChakraFlex } from '@chakra-ui/react';
import NotificationMenu from './system/NotificationMenu';
import ProfileMenu from './system/ProfileMenu';
import StatusBadge from './system/StatusBadge';

interface AppBarProps {
  onOpen: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onOpen }) => (
  <Flex
    as='header'
    align='center'
    justify='space-between'
    px={4}
    py={2}
    borderBottom={2}
    bg='white'
    position='sticky'
    top={0}
    zIndex={1000}
  >
    <Flex align={'center'}>
      <IconButton
        aria-label='Open menu'
        variant='ghost'
        onClick={onOpen}
        mr={2}
        color='gray.700'
        _hover={{ bg: 'gray.100', color: 'blue.600' }}
      >
        <HamburgerIcon />
      </IconButton>
      <Heading
        fontWeight={'light'}
        bgClip='text'
        color='gray.700'
        fontSize={{ base: 'xl', md: '2xl' }}
        letterSpacing='wide'
      >
        TeryaQ
      </Heading>
    </Flex>
    <Flex align='center' gap={2}>
      
      <StatusBadge />

      <NotificationMenu hasNotifications={true} />
      <ProfileMenu />
    </Flex>
  </Flex>
);

export default AppBar;
