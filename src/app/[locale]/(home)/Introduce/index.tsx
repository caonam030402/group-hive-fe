import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { IoCloudDownloadOutline } from "@react-icons/all-files/io5/IoCloudDownloadOutline";
import Image from "next/image";
import React from "react";

import { PATH } from "@/constants";
import { userService } from "@/services/user";

const listLogoCompany = [
  "https://framerusercontent.com/images/PPfehcyhCEreeqFeefrJsrMGQuI.png?scale-down-to=512",
  "https://framerusercontent.com/images/jzriHkTmxukLUMFozWuKPWIODNE.png?scale-down-to=512",
  "https://framerusercontent.com/images/eXnXhWuUyzZR8vgTMMR8mHO4Mw.png?scale-down-to=512",
  "https://framerusercontent.com/images/E7ZPZFHqhI1DAyDq3Olx13iOqFw.png?scale-down-to=512",
  "https://framerusercontent.com/images/7KT6pfYhbHMu69NtVo684Pv0dTY.png?scale-down-to=512",
  "https://framerusercontent.com/images/Yj8HKZJO1ZbKKEvN89cv8AiC19I.png?scale-down-to=512",
  "https://framerusercontent.com/images/hoIFPPBhMs6vJd54kVL36yoXc.png?scale-down-to=512",
  "https://framerusercontent.com/images/kKSIMXAgtOTILcsphmfpSOgdKSA.webp?scale-down-to=512",
];

export default function Introduce() {
  const { user } = userService.useProfile();
  const isAuthenticated = !!user;
  return (
    <div
      className="relative flex h-auto w-full flex-col items-center "
      style={{
        background:
          "linear-gradient(120deg, rgb(255, 255, 255) 0%, rgb(249, 249, 251) 100%)",
      }}
    >
      <div className="absolute z-10 h-[1100px] w-full flex-none object-cover">
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
      <div className="absolute bottom-[5%] z-10 text-center uppercase">
        Trusted by fast-growing companies from
        <span className="font-bold"> 125+</span> countries
        <div className="mt-2 flex flex-wrap gap-3">
          {listLogoCompany.map((logo) => (
            <div
              key={logo}
              className="flex h-[50px] w-[120px] items-center justify-center rounded-md bg-white/70 object-cover px-3"
            >
              <Image
                key={logo}
                width={2000}
                height={2000}
                className="rounded-md object-cover"
                src={logo}
                alt=""
              />
            </div>
          ))}
        </div>
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
        <div className="flex gap-4">
          <Button className="mt-5" size="lg" color="primary">
            Download Now <IoCloudDownloadOutline />
          </Button>
          {isAuthenticated && (
            <Button
              variant="bordered"
              className="mt-5"
              size="lg"
              as={Link}
              href={PATH.GET_STARTED}
              color="primary"
            >
              Launch Lark
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
