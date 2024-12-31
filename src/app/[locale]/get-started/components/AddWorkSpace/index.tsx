import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";

import RowSteps from "@/components/common/RowSteps";

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export default function AddWorkSpace({ isOpen, onOpenChange }: IProps) {
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a new workspace
            </ModalHeader>
            <ModalBody className="flex flex-col items-center text-center">
              <p className="text-sm text-gray-500">
                Fill in your organization details and kickstart efficient
                collaboration on Lark.
              </p>
              <RowSteps
                defaultStep={2}
                steps={[
                  {
                    title: "Create",
                  },
                  {
                    title: "Review",
                  },
                  {
                    title: "Publish",
                  },
                ]}
              />
              <Input
                labelPlacement="outside"
                label="Name"
                placeholder="Organization name"
              />
              <Select labelPlacement="outside" label="Select an animal">
                {animals.map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
