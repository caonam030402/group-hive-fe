import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { inviteWorkspaceGetOne } from "@/apis";
import Divider from "@/components/common/Divider";
import { ENameLocalS, PATH } from "@/constants";
import useApi from "@/hooks/useApi";
import { usePathname } from "@/libs/i18nNavigation";
import { getLocalStorage } from "@/utils/clientStorage";

import ModalQrCode from "../ModalInviteQrCode";

export default function QuickInvitation() {
  const [inviteInfo, setInviteInfo] = React.useState<IInviteWorkspace | null>();
  const { fetch } = useApi();
  const idWorkSpace = getLocalStorage({ key: ENameLocalS.WORKSPACE_ID });
  const pathName = usePathname();

  useEffect(() => {
    fetch({
      fn: inviteWorkspaceGetOne(idWorkSpace),
      onSuccess: (data) => {
        setInviteInfo(data.payload);
      },
    });
  }, [idWorkSpace, fetch]);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const link = `${pathName}${PATH.INVITE_WORKSPACE}${inviteInfo?.link}`;
  const textInviteLink = `You've been invited to join ${inviteInfo?.workspace.name}. You can join the organization via the 8-digit Invite Code {${inviteInfo?.inviteCode}. How to use Invite Code? You can also join the organization via this link ${link}`;
  const listOptionInvite = [
    {
      id: 1,
      label: "Invite Link",
      description:
        "Share the link with members. They can click the link to join the organization",
      action: (
        <Button
          onPress={() => {
            navigator.clipboard.writeText(textInviteLink).then(() => {
              toast.success("Copied to clipboard");
            });
          }}
          color="primary"
          size="sm"
        >
          Copy
        </Button>
      ),
    },
    {
      id: 2,
      label: "Invite Code",
      description:
        "Share the Invite Code with members. They can enter the Invite Code in Lark to join the organization.",
      action: (
        <Button
          onPress={() => {
            navigator.clipboard.writeText(textInviteLink).then(() => {
              toast.success("Copied to clipboard");
            });
          }}
          color="primary"
          size="sm"
        >
          Copy
        </Button>
      ),
    },
    {
      id: 3,
      label: "Invite QR Code",
      description:
        "hare the Invite QR Code with members. They can scan the QR code to join the organization.",
      action: (
        <Button onPress={onOpen} color="primary" size="sm">
          View
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <p className="text-[13px]">
          Expiration time of the Invite Link or Code below: Feb 24, 2025
        </p>
        <Button
          variant="light"
          className="h-6 min-w-0 px-2 text-[13px] text-primary"
        >
          Reset
        </Button>
      </div>
      <div className="rounded-lg border">
        {listOptionInvite.map((item) => (
          <div key={item.id}>
            <div className="flex items-center gap-3 p-4">
              <div>
                <p className="text-sm text-primary">{item.label}</p>
                <p className="text-[13px]">{item.description}</p>
              </div>
              {item.action}
            </div>
            {item.id !== listOptionInvite.length && <Divider className="m-0" />}
          </div>
        ))}
      </div>
      <ModalQrCode
        info={{
          inviteCode: inviteInfo?.inviteCode,
          nameSpace: inviteInfo?.workspace.name,
          valueQrCode: inviteInfo?.link,
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
