"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import React from "react";

import { docsHubSidebarMenu } from "@/constants/docsHub";
import { listDocsHub } from "@/constants/dric";
import useJump from "@/hooks/useJump";
import { cn } from "@/libs/utils";
import { docsHubService } from "@/services/docsHub";

export default function Folder() {
  const { handleJump, isActive } = useJump();

  const { data } = docsHubService.useGetAllPinnedDocs({});

  return (
    <div className="px-3">
      <div className="mb-2 font-bold">Lark docs</div>
      <Input
        size="sm"
        startContent={<MagnifyingGlass size={15} />}
        placeholder="Search"
      />
      <div className="mt-3 flex flex-col gap-2">
        {docsHubSidebarMenu.map((item) => {
          const IconComponent = item.iconComponent;
          return (
            <Button
              onPress={() => {
                handleJump({ url: item.link });
                // queryClient.invalidateQueries({ queryKey: [keyRQ.docsHub] });
              }}
              size="sm"
              variant="light"
              className={cn(
                "flex w-full text-sm items-center justify-start gap-1",
                {
                  "bg-primary-100 text-primary": isActive({ url: item.link }),
                },
              )}
              key={item.title}
            >
              <IconComponent size={20} /> {item.title}
            </Button>
          );
        })}
      </div>
      <div>
        <Accordion defaultExpandedKeys="1">
          <AccordionItem
            key="1"
            classNames={{
              title: "text-xs",
              indicator: "text-xs",
              trigger: "pb-1",
            }}
            aria-label="Pin"
            title="Pinned"
          >
            <div className="flex flex-col gap-4 ">
              {data?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 pl-3 text-xs"
                  >
                    <Image
                      className="color-contract-light"
                      width={18}
                      height={18}
                      src={
                        listDocsHub.find(
                          (itemDoc) => itemDoc.key === item.docsHub.docsType,
                        )?.icon || ""
                      }
                      alt="icon"
                    />
                    <div className="text-sm opacity-85">
                      {item.docsHub.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
