import { Badge } from '@chakra-ui/react';

interface BaseBadgeProps {
  children: React.ReactNode;
  colorPalette?: string;
}

export default function BaseBadge({
  children,
  colorPalette = 'blue',
}: BaseBadgeProps) {
  return (
    <Badge
      colorPalette={colorPalette}
      paddingX={2}
      paddingY={1}
      borderRadius='sm'
      fontSize='sm'
      border='1px solid'
    >
      {children}
    </Badge>
  );
}
