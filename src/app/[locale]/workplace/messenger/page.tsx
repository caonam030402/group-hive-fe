import Image from "next/image";
import React from "react";

import Card from "@/components/common/Card";
import MessageVector from "@/public/assets/images/vt_message.svg";

export default function page() {
  return (
    <Card isDecorative={false}>
      <div className="flex h-full flex-col items-center justify-center">
        <Image src={MessageVector} alt="logo" width={150} height={150} />
        <div className="mt-2 text-xl">Hi Nam !</div>
        <p className="text-sm">Do you checked my message ?</p>
      </div>
    </Card>
  );
}
