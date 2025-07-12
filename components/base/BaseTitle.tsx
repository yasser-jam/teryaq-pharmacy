import { Heading } from "@chakra-ui/react";

export default function BaseTitle({ children }: { children: React.ReactNode }) {
  return <Heading as='h1' size='2xl' fontWeight='medium' color='gray.800'>
    { children }
  </Heading>;
}
