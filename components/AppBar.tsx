'use client';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';

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
      >
        <HamburgerIcon />
      </IconButton>

      <Heading fontWeight={'light'} >TeryaQ</Heading>
    </Flex>
  </Flex>
);

export default AppBar;
