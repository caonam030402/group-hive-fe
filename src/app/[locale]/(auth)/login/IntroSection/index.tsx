/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

import Logo from "@/components/common/Logo";

export default function IntroSection() {
  return (
    <div className="h-full w-1/2 bg-[url('https://lf-scm-us.feishucdn.com/larksuite/global_registration_web/static/image/left-bg.cc3d00d0.png')] bg-cover p-10 2xl:w-[30%]">
      <Logo />
      <div className="flex h-[90%] flex-col items-center justify-center text-center">
        <div className="h-[300px] w-[90%] overflow-hidden rounded-3xl border-[15px] border-white">
          <video
            className="size-full rounded-md object-cover"
            src="https://framerusercontent.com/assets/3iiUyXf3NFxGzXdNizRJYlD4AY.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">Your one-stop work platform</div>
          <p className="mt-4 w-3/5 text-base">
            Manage information, workflows, and people, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
