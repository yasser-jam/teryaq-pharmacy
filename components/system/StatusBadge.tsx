import { Badge, Box } from "@chakra-ui/react";

function StatusBadge() {
  return (
    <Badge
      bg={'green.100'}
      color={'green.500'}
      border={'1px solid'}
      variant='solid'
      px={4}
      py={2}
      rounded={'md'}
      display='flex'
      alignItems='center'
      fontWeight='bold'
      fontSize='sm'
    >
      <Box
        as='span'
        boxSize={2}
        borderRadius='full'
        bg='green.600'
        display='inline-block'
        mr={2}
      />
      open now
    </Badge>
  );
}

export default StatusBadge