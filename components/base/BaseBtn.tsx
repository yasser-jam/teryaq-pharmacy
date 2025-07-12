import { Button } from '@chakra-ui/react';

interface BaseBtnProps {
  variant?: 'solid' | 'outline' | 'subtle' | 'surface' | 'ghost' | 'plain';
  children?: React.ReactNode;
  btnProps?: any
  onClick?: () => void
}

export default function BaseBtn({ children, variant = 'solid', onClick, btnProps }: BaseBtnProps) {
  return (
    <Button variant={variant} colorPalette={btnProps?.colorPalette} paddingX={4} onClick={onClick}>
      {children}
    </Button>
  );
}
