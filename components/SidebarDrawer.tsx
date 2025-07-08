'use client'

import React from "react";
import { Drawer, Stack, Link } from "@chakra-ui/react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, onClose }) => (
  <Drawer.Root open={isOpen} onOpenChange={onClose} placement="start">
    <Drawer.Content>
      <Drawer.Header>Menu</Drawer.Header>
      <Drawer.Body>
        <Stack align="start" gap={2}>
          <Link href="#">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
        </Stack>
      </Drawer.Body>
    </Drawer.Content>
  </Drawer.Root>
);

export default SidebarDrawer; 