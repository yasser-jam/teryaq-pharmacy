'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Stack,
  Tabs,
} from '@chakra-ui/react';
import { Role, Permission, RoleFormData } from '../../lib/schema';
import { useColorModeValue } from '../../components/ui/color-mode';
import BaseBtn from '../../components/base/BaseBtn';
import RoleCard from '../../components/settings/RoleCard';

interface RolePermissionState {
  [roleId: number]: {
    [permissionId: number]: boolean;
  };
}

// Static example data
const staticPermissions: Permission[] = [
  { 
    id: 1, 
    name: 'Create Employees',
    action: 'create', 
    resource: 'employees', 
    description: 'Create new employees',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 2, 
    name: 'View Employees',
    action: 'read', 
    resource: 'employees', 
    description: 'View employee information',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 3, 
    name: 'Edit Employees',
    action: 'update', 
    resource: 'employees', 
    description: 'Edit employee details',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 4, 
    name: 'Delete Employees',
    action: 'delete', 
    resource: 'employees', 
    description: 'Remove employees',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 5, 
    name: 'Create Medicines',
    action: 'create', 
    resource: 'medicines', 
    description: 'Add new medicines',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 6, 
    name: 'View Medicines',
    action: 'read', 
    resource: 'medicines', 
    description: 'View medicine catalog',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 7, 
    name: 'Edit Medicines',
    action: 'update', 
    resource: 'medicines', 
    description: 'Edit medicine information',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 8, 
    name: 'Delete Medicines',
    action: 'delete', 
    resource: 'medicines', 
    description: 'Remove medicines',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 9, 
    name: 'Manage Settings',
    action: 'manage', 
    resource: 'settings', 
    description: 'Access system settings',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
  { 
    id: 10, 
    name: 'View Reports',
    action: 'view', 
    resource: 'reports', 
    description: 'View system reports',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    active: true,
    systemGenerated: true
  },
];

const staticRoles: Role[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access with all permissions',
    active: true,
    system: true,
    systemGenerated: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    permissions: staticPermissions,
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Can manage employees and medicines but not system settings',
    active: true,
    system: false,
    systemGenerated: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    permissions: staticPermissions.filter(p => p.resource !== 'settings'),
  },
  {
    id: 3,
    name: 'Staff',
    description: 'Basic access to view and update assigned tasks',
    active: true,
    system: false,
    systemGenerated: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    permissions: staticPermissions.filter(p => p.action === 'read' || (p.action === 'update' && p.resource === 'employees')),
  },
  {
    id: 4,
    name: 'Viewer',
    description: 'Read-only access to system information',
    active: false,
    system: false,
    systemGenerated: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 1,
    updatedBy: 1,
    permissions: staticPermissions.filter(p => p.action === 'read' || p.action === 'view'),
  },
];

export default function SettingsPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermissionState>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Color mode values
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  // Load static data
  useEffect(() => {
    const loadStaticData = () => {
      try {
        setLoading(true);
        
        setRoles(staticRoles);
        setPermissions(staticPermissions);
        
        // Initialize role-permission state
        const initialState: RolePermissionState = {};
        staticRoles.forEach((role: Role) => {
          initialState[role.id] = {};
          staticPermissions.forEach((permission: Permission) => {
            initialState[role.id][permission.id] = role.permissions.some(p => p.id === permission.id);
          });
        });
        setRolePermissions(initialState);
      } catch (error) {
        console.error('Failed to load static data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay for better UX
    setTimeout(loadStaticData, 500);
  }, []);

  const handlePermissionToggle = (roleId: number, permissionId: number) => {
    setRolePermissions(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId]?.[permissionId],
      },
    }));
  };

  const handleSaveRole = async (roleId: number, roleData: Partial<RoleFormData>, selectedPermissions: number[]) => {
    try {
      setSaving(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      setRoles(prev => prev.map(role => 
        role.id === roleId 
          ? { 
              ...role, 
              ...roleData,
              permissions: permissions.filter(p => selectedPermissions.includes(p.id))
            }
          : role
      ));
      
      console.log('Role updated:', { roleId, roleData, selectedPermissions });
    } catch (error) {
      console.error('Failed to save role:', error);
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return (
      <Box p={6}>
        <Text>Loading settings...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <VStack align="start" gap={6} maxW="full">
        <Box>
          <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
            Settings
          </Text>
          <Text fontSize="lg" color={mutedTextColor}>
            Manage roles and permissions for your organization
          </Text>
        </Box>

        <Tabs.Root defaultValue="roles" w="full">
          <Tabs.List mb={6}>
            <Tabs.Trigger value="roles" px={6} py={3}>
              Roles & Permissions
            </Tabs.Trigger>
            <Tabs.Trigger value="general" px={6} py={3}>
              General Settings
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="roles">
            <VStack gap={6} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="semibold" color={textColor}>
                  Role Management
                </Text>
                <BaseBtn btnProps={{ colorPalette: 'blue' }}>
                  Add New Role
                </BaseBtn>
              </HStack>

              <Text fontSize="sm" color={mutedTextColor}>
                Configure roles and their associated permissions. System roles cannot be edited.
              </Text>

              <Stack gap={6}>
                {roles.map(role => (
                  <RoleCard 
                    key={role.id} 
                    role={role} 
                    permissions={permissions}
                    rolePermissions={rolePermissions[role.id] || {}}
                    onPermissionToggle={(permissionId) => handlePermissionToggle(role.id, permissionId)}
                    onSaveRole={(roleData, selectedPermissions) => handleSaveRole(role.id, roleData, selectedPermissions)}
                    saving={saving}
                  />
                ))}
              </Stack>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="general">
            <Box>
              <Text fontSize="xl" fontWeight="semibold" color={textColor} mb={4}>
                General Settings
              </Text>
              <Text color={mutedTextColor}>
                General settings will be available in future updates.
              </Text>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Box>
  );
} 