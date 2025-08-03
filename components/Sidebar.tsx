'use client';
import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  Link as LinkBtn,
} from '@chakra-ui/react';
import {
  FaUser,
  FaPills,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaHome,
  FaCashRegister,
} from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';
import Link from 'next/link';

const navLinks = [
  {
    label: 'Dashboard',
    icon: <FaHome />,
    href: '/',
  },
  {
    label: 'Sales & POS',
    icon: <FaCashRegister />,
    href: '/sales',
  },
  {
    label: 'Medicines',
    icon: <FaPills />,
    href: '/medicines',
  },
  {
    label: 'Employees',
    icon: <FaUser />,
    href: '/employees',
  },
  {
    label: 'Settings',
    icon: <FaCog />,
    href: '/settings',
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  // Modern color values
  const bg = useColorModeValue('white', 'gray.900');
  const border = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Flex
      direction='column'
      h='100vh'
      w={!isOpen ? '50px' : '220px'}
      bg={bg}
      borderRight='1px solid'
      borderColor={border}
      position='sticky'
      top={0}
      zIndex={100}
      transition='width 0.2s'
    >
      {/* Logo */}
      <Flex
        align='center'
        justify='flex-start'
        h='60px'
        px={4}
        borderBottom='1px solid'
        borderColor={border}
      >
        <Text fontWeight='bold' fontSize='xl' color={textColor}>
          {isOpen ? 'TQ' : 'T'}
        </Text>
      </Flex>
      {/* Navigation Links */}
      <VStack as='nav' align='stretch' gap={1} flex={1} mt={4}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Tooltip.Root key={link.href} open={false}>
              <Tooltip.Trigger asChild>
                <Link href={link.href} style={{ textDecoration: 'none !important' }}>
                  <LinkBtn
                    as={'div'}
                    display='flex'
                    alignItems='center'
                    px={4}
                    py={3}
                    borderRadius='md'
                    textDecoration='none !important'
                    bg={isActive ? activeBg : 'transparent'}
                    _hover={{ bg: hoverBg }}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    color={isActive ? activeColor : textColor}
                    justifyContent='flex-start'
                    transition='background 0.2s'
                  >
                    {link.icon}
                    {isOpen && <Text ml={3}>{link.label}</Text>}
                  </LinkBtn>
                </Link>
              </Tooltip.Trigger>
              {!isOpen && <Tooltip.Content>{link.label}</Tooltip.Content>}
            </Tooltip.Root>
          );
        })}
      </VStack>
    </Flex>
  );
};

export default Sidebar;
