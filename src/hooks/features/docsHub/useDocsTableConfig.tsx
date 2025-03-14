import {
  Copy,
  DotsThree,
  Heart,
  Link as LinkIcon,
  PushPin,
  PushPinSimple,
  PushPinSlash,
  Share,
  Trash,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import User from "@/components/common/User";
import { listDocsHub } from "@/constants/dric";
import { keyRQ } from "@/constants/keyRQ";
import { docsHubService } from "@/services/docsHub";
import type { IDocsHub } from "@/types/docsHub";
import { formatCustomTime } from "@/utils/formatDate";
import { renderFullName } from "@/utils/helpers";

export function useDocsTableConfig() {
  const { mutate: mutateAdd, isPending: isPendingAdd } =
    docsHubService.usePinnedDocs();
  const { mutate: mutateDelete, isPending: isPendingDelete } =
    docsHubService.useRemovePinnedDocs();
  const queryClient = useQueryClient();

  const handleActionPins = (data: IDocsHub) => {
    const mutation = data.pinned ? mutateDelete : mutateAdd;
    mutation(
      {
        docsHub: {
          id: data.id,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [keyRQ.docsHubPinned],
          });
          queryClient.invalidateQueries({ queryKey: [keyRQ.docsHub] });
        },
      },
    );
  };

  const PinButton = ({ data }: { data: IDocsHub }) =>
    data.pinned ? (
      <Button
        isDisabled={isPendingDelete || isPendingAdd}
        onPress={() => handleActionPins(data)}
        variant="light"
        isIconOnly
        size="xxs"
      >
        <PushPinSimple className="text-teal-700" size={13} weight="fill" />
      </Button>
    ) : (
      <Button
        isDisabled={isPendingDelete || isPendingAdd}
        variant="light"
        onPress={() => handleActionPins(data)}
        isIconOnly
        size="xxs"
      >
        <PushPinSimple
          className="hidden group-hover/row-table:block"
          size={13}
          weight="regular"
        />
      </Button>
    );

  const getActionItems = (data: IDocsHub) => [
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
      name: data.pinned ? "Remove From Pins" : "Add to Pins",
      icon: data.pinned ? <PushPinSlash size={17} /> : <PushPin size={17} />,
      action: () => {
        handleActionPins(data);
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
          <span className="flex items-center gap-2">
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
            <PinButton data={data} />
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
            listItem={getActionItems(item)}
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
