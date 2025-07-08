import { Badge } from '@chakra-ui/react';
import React from 'react';

interface RoleBadgeProps {
  role: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, color = 'blue.500', style, className }) => (
  <Badge
    fontSize='0.8em'
    color={color}
    px={3}
    py={1}
    borderRadius='md'
    position='absolute'
    top={0.5}
    right={0.5}
    zIndex={2}
    style={style}
    className={className}
  >
    {role}
  </Badge>
);

export default RoleBadge; 