import { IconButton, Menu, Flex } from '@chakra-ui/react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface MenuButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const menuItemHover = {
  bg: 'gray.50',
  borderRadius: 'md',
};

export function MenuButton({ onEdit, onDelete }: MenuButtonProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton aria-label='More options' variant='ghost' size='sm'>
          <FiMoreVertical />
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          p={2}
          borderRadius='md'
          boxShadow='lg'
          minW='36'
          bg='white'
        >
          <Menu.Item
            value='edit'
            onSelect={onEdit}
            cursor={'pointer'}
            transition={'background 0.2s'}
            _hover={menuItemHover}
          >
            <Flex
              align='center'
              gap={2}
              color='blue.500'
              paddingY={1}
              paddingX={2}
              fontWeight='medium'
              borderRadius='md'
              transition='background 0.15s'
            >
              <FiEdit2 /> Edit
            </Flex>
          </Menu.Item>
          <Menu.Item value='delete' onSelect={onDelete} _hover={menuItemHover}>
            <Flex
              align='center'
              gap={2}
              color='red.500'
              paddingY={1}
              paddingX={2}
              fontWeight='medium'
              borderRadius='md'
              transition='background 0.15s'
            >
              <FiTrash2 /> Delete
            </Flex>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
