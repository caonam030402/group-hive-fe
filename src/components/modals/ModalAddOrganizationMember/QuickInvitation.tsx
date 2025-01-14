import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import React from "react";
import toast from "react-hot-toast";

import Divider from "@/components/common/Divider";

import ModalQrCode from "../ModalInviteQrCode";

export default function QuickInvitation() {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const textInviteLink =
    "You've been invited to join 213213. You can join the organization via the 8-digit Invite Code WRKVPRPZ. How to use Invite Code? https://www.larksuite.com/hc/articles/360040931394 You can also join the organization via this link https://zsgakdoj63d3.sg.larksuite.com/invite/465BIcaaK8lg1?join=1&team_name=213213";
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
      <ModalQrCode isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
