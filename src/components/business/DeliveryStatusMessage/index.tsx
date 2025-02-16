import { Check, CircleNotch } from "@phosphor-icons/react";
import React from "react";

import { EMessageStatus } from "@/enums/chat";

interface Props {
  status: EMessageStatus;
  read?: {
    isRead: boolean;
    count: number;
    total: number;
  };
}

export default function DeliveryStatusMessage({
  status = EMessageStatus.SENT,
  read,
}: Props) {
  const percentage = read ? (read.count / read.total) * 100 : 0;

  const listRenderStatus = {
    [EMessageStatus.PENDING]: (
      <CircleNotch className="animate-spin" size={12} />
    ),
    [EMessageStatus.SENT]: (
      <div className="flex size-[11px] items-center justify-center rounded-full border-1 border-green-600">
        <Check weight="bold" size={7} className="text-green-600" />
      </div>
    ),
    [EMessageStatus.READ]: (
      <div className="flex size-[11px] items-center justify-center rounded-full border-1 border-green-600 ">
        <div
          className="size-[7px] rounded-full"
          style={{
            background: `conic-gradient(#19A254 ${percentage}%, #ffffff ${percentage}% 100%)`,
          }}
        />
      </div>
    ),
  };

  return <div>{listRenderStatus[status as keyof typeof listRenderStatus]}</div>;
}
