"use client";

import { Button } from "@heroui/button";
import { FacebookLogo, GoogleLogo } from "@phosphor-icons/react";
import React from "react";

import Divider from "@/components/common/Divider";
import { signInWithOAuth } from "@/configs/auth/action";

const listItemProvider = [
  {
    name: "Google",
    provider: "google",
    icon: <GoogleLogo size={20} />,
  },
  // {
  //   name: "Apple",
  //   provider: "apple",
  //   icon: <AppleLogo size={20} />,
  // },
  {
    name: "Facebook",
    provider: "facebook",
    icon: <FacebookLogo size={20} />,
  },
];

export default function AuthWithProvider() {
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center">
        <Divider className="h-px w-full bg-default-300" />
        <div className="w-1/2 text-center text-default-500">
          Or continue with
        </div>
        <Divider className="h-px w-full bg-default-300" />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        {listItemProvider.map((item, index) => (
          <form
            key={index}
            className="w-full"
            action={() => {
              signInWithOAuth({
                provider: item.provider as "google" | "facebook",
              });
            }}
          >
            <Button type="submit" size="md" className="w-full" key={index}>
              {item.icon}
              <span>{item.name}</span>
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
}
