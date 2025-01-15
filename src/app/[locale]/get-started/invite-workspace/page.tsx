"use client";

import { Button, Image, Link } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

import Card from "@/components/common/Card";
import Header from "@/components/layouts/Header";
import { PATH } from "@/constants";
import { bgBluePink } from "@/constants/bgImage";
import { cn } from "@/libs/utils";

export default function InviteWorkspace() {
  const { data } = useSession();
  const isAuth = !!data?.user;

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: `url(${bgBluePink})`,
        }}
        className="flex h-[calc(100vh-70px)] items-center justify-center"
      >
        <Card
          classNames={{
            base: "h-auto w-[20vw] !overflow-visible",
            body: "relative !overflow-visible",
          }}
          shadow="lg"
        >
          <div className=" flex flex-col items-center justify-center p-4 text-center">
            <Image
              width={80}
              height={80}
              classNames={{
                wrapper: "absolute top-[-18%]",
              }}
              src="https://cdn.dribbble.com/userupload/14785082/file/original-1e21952b088b78455115d8e87adf6cc3.png?resize=1024x768&vertical=center"
              alt=""
            />
            <div className="mt-8 text-sm">Nam Cao has invited you to join</div>
            <div className="mt-2 text-2xl font-bold">IT-tech</div>
            <Button
              color={isAuth ? "primary" : "default"}
              disabled={!isAuth}
              className={cn("mt-3 w-full", {
                "cursor-not-allowed": !isAuth,
              })}
            >
              Join Now
            </Button>
            {!isAuth && (
              <p className="mt-3 text-xs">
                If you don&apos;t have an account yet, please
                <Link className="ml-1 text-xs" href={PATH.REGISTER}>
                  Register
                </Link>
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
