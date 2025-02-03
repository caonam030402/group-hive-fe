"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { workSpaceKeyRQ } from "@/constants/keyRQ";
import { workspaceService } from "@/services";
import { userService } from "@/services/user";
import type { WorkSpaceValidation } from "@/validations/workSpaceValidation";
import workSpaceValidation from "@/validations/workSpaceValidation";

import Create from "./Create";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseAdd: () => void;
}

export type FormType = Pick<
  WorkSpaceValidation,
  "industry" | "name" | "region" | "size" | "terms"
>;
const rules = workSpaceValidation.pick({
  industry: true,
  name: true,
  region: true,
  size: true,
  terms: true,
});

export default function ModalAddWorkSpace({
  isOpen,
  onOpenChange,
  onCloseAdd,
}: IProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(rules),
  });
  const queryClient = useQueryClient();

  const { user } = userService.useProfile();
  const { mutate, isPending } = workspaceService.useCreate();

  const handleAddWorkSpace = (data: FormType) => {
    const body = {
      ...data,
      terms: undefined,
      owner: {
        id: user?.id ?? "",
      },
    };
    mutate(body, {
      onSuccess: () => {
        toast.success("Workspace created successfully");
        onCloseAdd();
        queryClient.invalidateQueries({ queryKey: [workSpaceKeyRQ.workspace] });
      },
    });
  };

  return (
    <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={form.handleSubmit(handleAddWorkSpace)}>
            <ModalHeader className="flex flex-col gap-1">
              Add a new workspace
              <p className="text-xs font-normal text-gray-500 ">
                We will streamline your setup experience accordingly
              </p>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <Create form={form} />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  form.reset();
                }}
              >
                Close
              </Button>
              <Button isLoading={isPending} type="submit" color="primary">
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
