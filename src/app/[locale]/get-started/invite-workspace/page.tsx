"use client";

import { Button, Image, Link } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import Card from "@/components/common/Card";
import Header from "@/components/layouts/Header";
import { PATH } from "@/constants";
import { bgBluePink } from "@/constants/bgImage";
import useWorkspace from "@/hooks/useWorkspace";
import { cn } from "@/libs/utils";
import { workspaceService } from "@/services";
import { userService } from "@/services/user";

export default function InviteWorkspace() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user } = userService.useProfile();
  const isAuth = !!user;
  const { data: inviteInfo } = workspaceService.useGetInviteById(id, {
    enabled: !!id,
  });
  const { handleSaveAndNavigateToWorkplace } = useWorkspace();

  const { mutate } = workspaceService.useJoin();

  const handleJoin = () => {
    if (id) {
      mutate(
        { workspaceId: id, userId: user?.id },
        {
          onSuccess: () => {
            toast.success("Join workspace successfully");
            handleSaveAndNavigateToWorkplace(id);
          },
        },
      );
    }
  };

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
              src={inviteInfo?.workspace.avatar}
              alt=""
            />
            <div className="mt-8 text-sm">Nam Cao has invited you to join</div>
            <div className="mt-2 text-2xl font-bold">
              {inviteInfo?.workspace.name}
            </div>
            <Button
              color={isAuth ? "primary" : "default"}
              disabled={!isAuth}
              className={cn("mt-3 w-full", {
                "cursor-not-allowed": !isAuth,
              })}
              onPress={() => handleJoin()}
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
