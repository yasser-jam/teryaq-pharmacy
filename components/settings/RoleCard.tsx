'use client';
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Card,
  Input,
  Textarea,
  Badge,
  IconButton,
  Switch,
  Grid,
} from '@chakra-ui/react';
import {
  EditIcon,
  AddIcon,
  DeleteIcon,
  CheckIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { Role, Permission, RoleFormData } from '../../lib/schema';
import { useColorModeValue } from '../ui/color-mode';

interface RoleCardProps {
  role: Role;
  permissions: Permission[];
  rolePermissions: { [permissionId: number]: boolean };
  onPermissionToggle: (permissionId: number) => void;
  onSaveRole: (
    roleData: Partial<RoleFormData>,
    selectedPermissions: number[]
  ) => Promise<void>;
  saving?: boolean;
}

export default function RoleCard({
  role,
  permissions,
  rolePermissions,
  onPermissionToggle,
  onSaveRole,
  saving = false,
}: RoleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleData, setEditingRoleData] = useState<Partial<RoleFormData>>(
    {}
  );

  // Enhanced color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');

  const handleEditRole = () => {
    setIsEditing(true);
    setEditingRoleData({
      name: role.name,
      description: role.description,
      active: role.active,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingRoleData({});
  };

  const handleSaveRole = async () => {
    const selectedPermissions = Object.entries(rolePermissions)
      .filter(([_, selected]) => selected)
      .map(([permissionId]) => parseInt(permissionId));

    await onSaveRole(editingRoleData, selectedPermissions);
    setIsEditing(false);
    setEditingRoleData({});
  };

  const isSystemRole = role.system;

  return (
    <Card.Root
      bg={cardBg}
      borderColor={borderColor}
      borderWidth='1px'
      shadow='sm'
      _hover={{ shadow: 'md' }}
      transition='all 0.2s'
    >
      <Card.Header p={6}>
        <HStack justify='space-between' align='flex-start'>
          <VStack align='start' gap={3} flex={1}>
            {isEditing ? (
              <Input
                value={editingRoleData.name || ''}
                onChange={(e) =>
                  setEditingRoleData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder='Role name'
                size='md'
                fontWeight='semibold'
                borderColor={borderColor}
                _focus={{ borderColor: 'blue.400', shadow: 'outline' }}
              />
            ) : (
              <HStack gap={3}>
                <Text fontSize='xl' fontWeight='bold' color={textColor}>
                  {role.name}
                </Text>
                {isSystemRole && (
                  <Badge colorPalette='blue' size='sm' variant='solid'>
                    System
                  </Badge>
                )}
                {!role.active && (
                  <Badge colorPalette='red' size='sm' variant='solid'>
                    Inactive
                  </Badge>
                )}
              </HStack>
            )}

            {isEditing ? (
              <Textarea
                value={editingRoleData.description || ''}
                onChange={(e) =>
                  setEditingRoleData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder='Role description'
                size='sm'
                rows={2}
                borderColor={borderColor}
                _focus={{ borderColor: 'blue.400', shadow: 'outline' }}
              />
            ) : (
              <Text fontSize='md' color={mutedTextColor} lineHeight='1.5'>
                {role.description}
              </Text>
            )}
          </VStack>

          <HStack gap={2}>
            {isEditing ? (
              <>
                <IconButton
                  aria-label='Save changes'
                  size='sm'
                  colorPalette='green'
                  variant='solid'
                  onClick={handleSaveRole}
                  loading={saving}
                  disabled={saving}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  aria-label='Cancel editing'
                  size='sm'
                  variant='outline'
                  colorPalette='gray'
                  onClick={handleCancelEdit}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <IconButton
                aria-label='Edit role'
                size='sm'
                variant='outline'
                colorPalette='blue'
                onClick={handleEditRole}
                disabled={isSystemRole}
                _hover={{ bg: hoverBg }}
              >
                <EditIcon />
              </IconButton>
            )}
          </HStack>
        </HStack>
      </Card.Header>

      <Card.Body p={6} pt={0}>
        <VStack align='start' gap={4}>
          <Text fontSize='lg' fontWeight='semibold' color={textColor}>
            Permissions
          </Text>

          <Grid
            templateColumns='repeat(auto-fit, minmax(280px, 1fr))'
            gap={4}
            w='full'
          >
            {permissions.map((permission) => (
              <Box
                key={permission.id}
                p={4}
                bg={useColorModeValue('gray.50', 'gray.700')}
                borderRadius='lg'
                borderWidth='1px'
                borderColor={borderColor}
                _hover={{
                  bg: hoverBg,
                  borderColor: useColorModeValue('blue.200', 'blue.600'),
                  transform: 'translateY(-1px)',
                  shadow: 'md',
                }}
                transition='all 0.2s ease'
                cursor='pointer'
                onClick={() =>
                  !isSystemRole && onPermissionToggle(permission.id)
                }
              >
                <HStack justify='space-between' align='center'>
                  <VStack align='start' gap={1} flex={1}>
                    <Text fontSize='md' fontWeight='semibold' color={textColor}>
                      {permission.action.charAt(0).toUpperCase() +
                        permission.action.slice(1)}{' '}
                      {permission.resource.charAt(0).toUpperCase() +
                        permission.resource.slice(1)}
                    </Text>
                    <Text fontSize='sm' color={mutedTextColor}>
                      {permission.description}
                    </Text>
                  </VStack>

                  <Switch.Root colorPalette='blue'>
                    <Switch.HiddenInput />
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    <Switch.Label />
                  </Switch.Root>
                </HStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
