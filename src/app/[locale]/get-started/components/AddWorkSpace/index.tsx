import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

import Create from "./Create";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddWorkSpace({ isOpen, onOpenChange }: IProps) {
  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a new workspace
            </ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <Create />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary">Create</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
