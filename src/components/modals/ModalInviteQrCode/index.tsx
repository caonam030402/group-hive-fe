import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { toPng } from "html-to-image";
import { useSession } from "next-auth/react";
import React, { useCallback, useRef } from "react";
import toast from "react-hot-toast";

import QrCode from "@/components/common/QrCode";
import User from "@/components/common/User";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  isOpen: boolean;
  onOpenChange: () => void;
  info?: {
    inviteCode?: String;
    valueQrCode?: string;
    nameSpace?: String;
  };
}

export default function ModalInviteQrCode({
  isOpen,
  onOpenChange,
  info = {
    inviteCode: "WRKVPRPZ",
    valueQrCode: "",
    nameSpace: "IT-Tech",
  },
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useSession();
  const handleDownloadQrCode = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${info.nameSpace}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Download successfully");
    });
  }, [info.nameSpace]);

  const fullName =
    data?.user && renderFullName(data?.user.firstName, data?.user.lastName);
  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div>Invite QR Code</div>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <div className="flex flex-col items-center">
                <div
                  ref={ref}
                  className="flex flex-col items-center justify-center rounded-md bg-white p-6"
                >
                  <User
                    onlyAvatar
                    info={{ avatar: data?.user?.avatar || "" }}
                  />
                  <div className="mt-2 text-sm">
                    <span className="mt-2 font-bold">{fullName}</span> has been
                    invited to join the workspace
                  </div>
                  <div className="my-10 text-xl font-bold">
                    {info.nameSpace}
                  </div>
                  <QrCode value={info?.valueQrCode} />
                  <div className="mt-8 text-center">
                    <div className="text-xs">Invite Code</div>
                    <div className="text-xl font-bold">{info.inviteCode}</div>
                  </div>
                </div>
                <Button
                  onPress={() => handleDownloadQrCode()}
                  color="primary"
                  variant="bordered"
                  className="mt-8"
                >
                  Download
                </Button>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
