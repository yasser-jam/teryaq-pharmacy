import React from 'react';
import { Dialog, Button, CloseButton, Portal } from '@chakra-ui/react';
import BaseBtn from './BaseBtn';

interface BaseDialogProps {
  title: string;
  width?: string | number;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  title,
  width = '32rem',
  open,
  onSubmit,
  onClose,
  children,
}) => {
  return (
    <Dialog.Root
      open={open}
      placement={'center'}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content width={width} padding={6} maxW='100vw'>
            <Dialog.Header>
              <Dialog.Title fontSize={28}>{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  onClick={onClose}
                  size='lg'
                  position='absolute'
                  right={3}
                  top={3}
                />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body paddingY={6}>{children}</Dialog.Body>
            <Dialog.Footer justifyContent='flex-end' gap={2}>
              <Dialog.ActionTrigger asChild>
                <BaseBtn variant='ghost' onClick={onClose}>
                  Cancel
                </BaseBtn>
              </Dialog.ActionTrigger>
              <BaseBtn
                btnProps={{ colorPalette: 'blue' }}
                onClick={onSubmit}
              >
                Save
              </BaseBtn>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BaseDialog;
