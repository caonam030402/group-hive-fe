import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React from "react";

import type { IPropModal } from "@/types";

interface IProps extends IPropModal {
  name: string;
  urlImages: string[];
}

export default function ModalSendImage({
  isOpen,
  onOpenChange,
  name,
  urlImages,
}: IProps) {
  console.log(urlImages);
  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Send to {name}
            </ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <Input
                labelPlacement="outside"
                label="Code Invitation"
                placeholder="Enter the Invite Code"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary">Send</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
