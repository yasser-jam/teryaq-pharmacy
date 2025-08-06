'use client'
import { Box } from "@chakra-ui/react";

import { Flex } from "@chakra-ui/react";
import AppBar from "../../../components/AppBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex>
      <Box flex='1' minH='100vh' bg='#F8F9FA'>
        <AppBar onOpen={() => {}} />
        <Box as='main' p={6}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
