import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import Image from "next/image";
import React from "react";

import Divider from "@/components/common/Divider";
import Logo from "@/components/common/Logo";

import { listContent, listIcons } from "../constant";

export default function IntroSection() {
  return (
    <div className="h-full w-1/2 bg-[url('https://lf-scm-us.feishucdn.com/larksuite/global_registration_web/static/image/left-bg.cc3d00d0.png')] bg-cover p-10 2xl:w-[30%]">
      <Logo />
      <div className="flex h-[90%] flex-col items-center justify-center p-6 text-center">
        <Image
          width={50}
          height={50}
          src="https://lf-scm-us.feishucdn.com/larksuite/global_registration_web/static/svg/emoji_wavinghand_v1.f472d523.svg"
          alt="lark"
        />
        <div className="mt-5 text-xl font-bold">
          <h1>Bye Operation Chaos.</h1>
          <h1> Hello Lark.</h1>
        </div>
        <Divider className="my-10 h-[0.5px] bg-primary" />
        <div className="w-full text-left">
          <span className="font-bold text-primary">Free plan</span> starts from{" "}
          <span className="font-bold text-primary">$0/month</span>
          <div>No credit card required</div>
        </div>
        <div className="my-5 w-full space-y-4">
          {listContent.map((item, index) => (
            <div className="my-2 flex items-center gap-2" key={index}>
              <FaCheck className="text-green-500" />
              <div className="text-left">{item}</div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between">
          {listIcons?.map((item, index) => (
            <div className="my-2 flex flex-col items-center" key={index}>
              <img className="size-[90%]" src={item.icon} alt={item.name} />
              <div className="text-left text-xs">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
