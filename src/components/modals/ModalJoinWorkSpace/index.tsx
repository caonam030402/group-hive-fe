import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ModalJoinWorkSpace({ isOpen, onOpenChange }: IProps) {
  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div>Enter Invite Code</div>
              <p className="text-xs font-normal text-gray-500 ">
                The Invite Code is 8 characters long and contains only letters.{" "}
                <Link size="sm" className="text-xs font-normal" href="1">
                  How to get the Invite Code?
                </Link>
              </p>
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
              <Button color="primary">Join</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
