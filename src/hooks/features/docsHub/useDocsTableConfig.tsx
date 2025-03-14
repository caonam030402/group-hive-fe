import { Button } from "@heroui/button";
import {
  Copy,
  DotsThree,
  Heart,
  Link as LinkIcon,
  PushPin,
  Share,
  Trash,
} from "@phosphor-icons/react";
import Image from "next/image";

import Dropdown from "@/components/common/Dropdown";
import User from "@/components/common/User";
import { listDocsHub } from "@/constants/dric";
import { docsHubService } from "@/services/docsHub";
import type { IDocsHub } from "@/types/docsHub";
import { formatCustomTime } from "@/utils/formatDate";
import { renderFullName } from "@/utils/helpers";

export function useDocsTableConfig() {
  const { mutate } = docsHubService.usePinnedDocs();

  const getActionItems = (itemId: string) => [
    { id: "1", name: "Share", icon: <Share size={17} />, action: () => null },
    {
      id: "2",
      name: "Copy Link",
      icon: <LinkIcon size={17} />,
      action: () => null,
    },
    {
      id: "2",
      name: "Make a Copy",
      icon: <Copy size={17} />,
      action: () => null,
    },
    {
      id: "2",
      name: "Add to Pins",
      icon: <PushPin size={17} />,
      action: () => {
        mutate({
          docsHub: {
            id: itemId,
          },
        });
      },
    },
    {
      id: "2",
      name: "Add to Favorites",
      icon: <Heart size={17} />,
      action: () => null,
    },
    { id: "2", name: "Delete", icon: <Trash size={17} />, action: () => null },
  ];
  const listColumnsTable = [
    {
      key: "name",
      label: "NAME",
      render: (data: IDocsHub) => {
        return (
          <span className="flex gap-2">
            <Image
              alt=""
              src={
                listDocsHub.find((item) => item.key === data.docsType)?.icon ||
                ""
              }
              width={20}
              height={20}
            />
            {data.name}
          </span>
        );
      },
    },
    {
      key: "OWNER",
      label: "OWNER",
      render: (data: IDocsHub) => {
        return (
          <div>
            <span className="font-normal">
              <User
                classNames={{ avatar: "w-6 h-6", name: "text-sm font-normal" }}
                info={{
                  name: renderFullName(
                    data.author.firstName,
                    data.author.lastName,
                  ),
                  avatar: data.author.avatar,
                }}
              />
            </span>
          </div>
        );
      },
    },
    {
      key: "lastOpenedAt",
      label: "LAST OPENED",
      render: (data: IDocsHub) => {
        return <span>{formatCustomTime(data.lastOpenedAt)}</span>;
      },
    },
    {
      key: "action",
      label: "ACTION",
      render: (item: IDocsHub) => {
        return (
          <Dropdown
            props={{
              placement: "bottom-end",
            }}
            listItem={getActionItems(item.id)}
            trigger={
              <Button size="sm" variant="light" isIconOnly>
                <DotsThree size={20} />
              </Button>
            }
          />
        );
      },
    },
  ];

  return {
    listColumnsTable,
  };
}
