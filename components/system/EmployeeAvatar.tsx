import { Avatar } from '@chakra-ui/react';
import { MdOutlineFemale, MdOutlineMale } from 'react-icons/md';

const roleColor: Record<string, string> = {
  admin: 'blue',
  manager: 'purple',
  staff: 'green',
  default: 'gray',
};

export interface EmployeeAvatarProps {
  name: string;
  gender?: 'male' | 'female';
  role?: string;
}

export function EmployeeAvatar({
  name,
  gender = 'male',
  role = 'default',
}: EmployeeAvatarProps) {
  const colorPalette = roleColor[role] || roleColor.default;
  const icon =
    gender === 'female' ? (
      <MdOutlineFemale size={28} />
    ) : (
      <MdOutlineMale size={28} />
    );

  return (
    <Avatar.Root colorPalette={colorPalette} size='lg'>
      <Avatar.Fallback name={name}>{icon}</Avatar.Fallback>
    </Avatar.Root>
  );
}
