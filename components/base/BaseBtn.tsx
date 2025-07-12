import { Button } from '@chakra-ui/react';
import React from 'react';

interface BaseBtnProps {
  variant?: 'solid' | 'outline' | 'subtle' | 'surface' | 'ghost' | 'plain';
  children?: React.ReactNode;
  btnProps?: any;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const BaseBtn = React.forwardRef<HTMLButtonElement, BaseBtnProps>(
  ({ children, variant = 'solid', onClick, btnProps, type = 'button' }, ref) => {
    return (
      <Button
        variant={variant}
        colorPalette={btnProps?.colorPalette}
        paddingX={4}
        onClick={onClick}
        type={type}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

export default BaseBtn;
