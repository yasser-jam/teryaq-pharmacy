import { Button, HStack } from '@chakra-ui/react';
import { MdGridView, MdTableChart } from 'react-icons/md';

interface SysViewModeProps {
  viewMode: 'table' | 'cards';
  setViewMode: (viewMode: 'table' | 'cards') => void;
}

export default function SysViewMode({
  viewMode = 'table',
  setViewMode,
}: SysViewModeProps) {
  return (
      <HStack gap={1} bg='blue.500' p={1} borderRadius='sm'>
        <Button
          size='xs'
          variant={viewMode === 'table' ? 'solid' : 'ghost'}
          colorScheme={viewMode === 'table' ? 'white' : 'blue'}
          bg={viewMode === 'table' ? 'white' : 'transparent'}
          color={viewMode === 'table' ? 'blue.500' : 'white'}
          _hover={{
            bg: viewMode === 'table' ? 'gray.50' : 'blue.600',
          }}
          onClick={() => setViewMode('table')}
          borderRadius='sm'
        >
          <MdTableChart size={18} />
        </Button>
        <Button
          size='xs'
          variant={viewMode === 'cards' ? 'solid' : 'ghost'}
          colorScheme={viewMode === 'cards' ? 'white' : 'blue'}
          bg={viewMode === 'cards' ? 'white' : 'transparent'}
          color={viewMode === 'cards' ? 'blue.500' : 'white'}
          _hover={{
            bg: viewMode === 'cards' ? 'gray.50' : 'blue.600',
          }}
          onClick={() => setViewMode('cards')}
          borderRadius='sm'
        >
          <MdGridView size={18} />
        </Button>
      </HStack>
  );
}
