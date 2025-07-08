'use client'
import React, { useState } from "react";
import { Box, Flex, IconButton, Text, VStack, Link } from "@chakra-ui/react";
import { FaUser, FaPills, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Tooltip } from "@chakra-ui/react";

const navLinks = [
  {
    label: "Employees",
    icon: <FaUser />,
    href: "/employees",
  },
  {
    label: "Medicines",
    icon: <FaPills />,
    href: "/medicines",
  },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <Flex
      direction="column"
      h="100vh"
      w={collapsed ? "60px" : "220px"}
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      transition="width 0.2s"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Logo */}
      <Flex align="center" justify={collapsed ? "center" : "flex-start"} h="60px" px={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="bold" fontSize="xl" display={collapsed ? "none" : "block"}>My Admin</Text>
        {collapsed && <Text fontWeight="bold" fontSize="2xl">M</Text>}
      </Flex>
      {/* Navigation Links */}
      <VStack as="nav" align="stretch" gap={1} flex={1} mt={4}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Tooltip.Root key={link.href} open={collapsed ? undefined : false}>
              <Tooltip.Trigger asChild>
                <Link
                  href={link.href}
                  display="flex"
                  alignItems="center"
                  px={collapsed ? 0 : 4}
                  py={3}
                  borderRadius="md"
                  bg={isActive ? "gray.100" : "transparent"}
                  _hover={{ bg: "gray.50" }}
                  fontWeight={isActive ? "bold" : "normal"}
                  color={isActive ? "blue.500" : "gray.700"}
                  justifyContent={collapsed ? "center" : "flex-start"}
                  transition="background 0.2s"
                >
                  {link.icon}
                  {!collapsed && <Text ml={3}>{link.label}</Text>}
                </Link>
              </Tooltip.Trigger>
              {collapsed && (
                <Tooltip.Content>
                  {link.label}
                </Tooltip.Content>
              )}
            </Tooltip.Root>
          );
        })}
      </VStack>
      {/* Collapse Button */}
      <Box p={2} borderTop="1px solid" borderColor="gray.200">
        <IconButton
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
          size="sm"
          w="full"
          variant="ghost"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </IconButton>
      </Box>
    </Flex>
  );
};

export default Sidebar; 