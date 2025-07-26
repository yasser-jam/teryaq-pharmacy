import { Avatar } from '@chakra-ui/react';
import { MdPerson } from 'react-icons/md';

const genderColor: Record<string, string> = {
  female: 'pink',
  male: 'blue',
  default: 'gray',
};

export interface EmployeeAvatarProps {
  name: string;
  gender?: 'male' | 'female';
  role?: string; // Keeping role prop for compatibility but not using it for color
}

export function EmployeeAvatar({
  name,
  gender = 'male',
  role, // Unused parameter for backward compatibility
}: EmployeeAvatarProps) {
  const colorPalette = genderColor[gender] || genderColor.default;

  return (
    <Avatar.Root colorPalette={colorPalette} size='lg'>
      <Avatar.Fallback name={name}>
        <MdPerson size={28} />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
