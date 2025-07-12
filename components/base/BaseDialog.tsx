import React from "react";
import { Dialog, Button, CloseButton, Portal } from "@chakra-ui/react";

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
  width = "32rem",
  open,
  onSubmit,
  onClose,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => { if (!e.open) onClose(); }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content width={width} maxW="100vw">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton onClick={onClose} size="sm" position="absolute" right={3} top={3} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer justifyContent="flex-end" gap={2}>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" mr={2} onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button colorScheme="blue" onClick={onSubmit}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default BaseDialog; 