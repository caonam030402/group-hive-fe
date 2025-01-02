import { Button } from "@nextui-org/button";
import { IoCloudDownloadOutline } from "@react-icons/all-files/io5/IoCloudDownloadOutline";
import Image from "next/image";
import React from "react";

export default function Introduce() {
  return (
    <div
      className="relative flex h-screen w-full flex-col items-center "
      style={{
        background:
          "linear-gradient(120deg, rgb(255, 255, 255) 0%, rgb(249, 249, 251) 100%)",
      }}
    >
      <div className="absolute  z-10 h-[1100px] w-full flex-none object-cover">
        <Image
          width={1820}
          height={1100}
          className="size-full rounded-md object-cover"
          src="https://framerusercontent.com/images/PFndlXPw7ZnW1cAJl4zNb0HxfM.jpg?scale-down-to=2048"
          alt=""
        />
      </div>
      <div className="right-0 top-[50px] z-10 h-[1100px] w-full max-w-[1820px] flex-none object-cover">
        <video
          muted
          className="size-full rounded-md object-cover"
          src="https://framerusercontent.com/assets/81NHtv0iyw6dYfipy1368Pukjk.mp4"
          autoPlay
          loop
        />
      </div>

      <div className="absolute z-10 mt-10 flex flex-col items-center gap-5">
        <div className="text-center text-5xl font-bold">
          Your <span className="text-primary">Digital Hub</span> to <br />
          simplify business operations
        </div>
        <div className="mt-3 w-3/5 text-center text-base text-gray-800">
          Turn boardroom vision into operational excellence with tools for
          centralized communication, project management, digital workflows,
          analytics and more.
        </div>
        <Button className="mt-5" size="lg" color="primary">
          Download Now <IoCloudDownloadOutline />
        </Button>
      </div>
      <div className="absolute bottom-0 z-10 uppercase">
        Trusted by fast-growing companies from
        <span className="font-bold"> 125+</span> countries
      </div>
    </div>
  );
}
