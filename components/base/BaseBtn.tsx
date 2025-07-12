import { Button } from '@chakra-ui/react';

interface BaseBtnProps {
  variant?: 'solid' | 'outline' | 'subtle' | 'surface' | 'ghost' | 'plain';
  children?: React.ReactNode;
}

export default function BaseBtn({ children, variant = 'solid' }: BaseBtnProps) {
  return (
    <Button variant={variant} colorPalette='blue' paddingX={4}>
      {children}
    </Button>
  );
}
