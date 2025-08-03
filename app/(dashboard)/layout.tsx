'use client'
import { Box, Flex } from "@chakra-ui/react";
import AppBar from "../../components/AppBar";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <Flex>
      <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Box flex='1' minH='100vh' bg='#F8F9FA'>
        <AppBar onOpen={() => setDrawerOpen(!drawerOpen)} />
        <Box as='main' p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
