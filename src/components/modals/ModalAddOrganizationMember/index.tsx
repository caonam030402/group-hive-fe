import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import RenderCondition from "@/components/common/RenderCondition";
import { workspaceService } from "@/services";
import type { IPropModal } from "@/types";

import QuickInvitation from "./QuickInvitation";
import ViaEmail from "./ViaEmail";

enum EKeyTab {
  EMAIL = 1,
  QUICK_INVITATION = 2,
}

const listTab = [
  {
    key: EKeyTab.EMAIL,
    label: "Email",
  },
  {
    key: EKeyTab.QUICK_INVITATION,
    label: "Quick Invitation",
  },
];

export default function ModalAddOrganizationMember({
  isOpen,
  onOpenChange,
}: IPropModal) {
  const [activeKey, setActiveKey] = React.useState<EKeyTab>(EKeyTab.EMAIL);
  const { mutate, isPending } = workspaceService.useSendMailsInvite();
  const formEmail = useForm();
  const handleSendMailInvite = async (data: { [key: string]: string }) => {
    const listEmail: string[] = [];
    Object.entries(data).map(([_key, value]) => listEmail.push(value));
    mutate(listEmail, {
      onSuccess: () => {
        formEmail.reset();
        toast.success("Send mail invite successfully");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Organization Member
            </ModalHeader>
            <ModalBody>
              <Tabs
                onSelectionChange={(value) => {
                  setActiveKey(value as EKeyTab);
                }}
                aria-label="Tabs variants"
                variant="underlined"
              >
                {listTab.map((tab) => (
                  <Tab key={tab.key} title={tab.label} />
                ))}
              </Tabs>
              <RenderCondition
                keepAlive
                condition={+activeKey === EKeyTab.EMAIL}
                ifContent={<ViaEmail form={formEmail} />}
                elseContent={<QuickInvitation />}
              />
            </ModalBody>
            <ModalFooter>
              {+activeKey === EKeyTab.EMAIL && (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={isPending}
                    color="primary"
                    onClick={formEmail.handleSubmit(handleSendMailInvite)}
                  >
                    Send
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
