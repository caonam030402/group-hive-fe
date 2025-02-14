import { ArrowSquareOut } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import React from "react";

import ArrayRepeater from "@/components/common/ArrayRepeater";
import RenderCondition from "@/components/common/RenderCondition";
import SkeletonUser from "@/components/common/Skeletons/SkeletonUser";
import User from "@/components/common/User";
import { keyRQ } from "@/constants/keyRQ";
import { EChatType } from "@/enums/chat";
import useWorkspace from "@/hooks/useWorkspace";
import { chatService, workspaceService } from "@/services";
import { userService } from "@/services/user";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  onClose: () => void;
}

export default function TabMember({ onClose }: IProps) {
  const { workspaceId } = useWorkspace();
  const router = useRouter();
  const { user } = userService.useProfile();

  const { mutate } = chatService.useCreateChat();
  const queryClient = useQueryClient();

  const { data, isLoading } = workspaceService.useGetMembers(workspaceId);

  const handleNavigate = (userRecipient: IUser) => {
    mutate(
      {
        hasCheck: true,
        chatType: EChatType.PRIVATE,
        userChats: [
          {
            user: { id: userRecipient.id },
          },
          {
            user: { id: user.id },
          },
        ],
        workspace: {
          id: workspaceId,
        } as IWorkspace,
      },
      {
        onSuccess: (res) => {
          const chatId = res.payload.id;
          onClose();
          router.replace(
            `/workplace/messenger/${chatId}?recipientId=${userRecipient.id}`,
          );
          queryClient.invalidateQueries({ queryKey: [keyRQ.chat] });
        },
      },
    );
  };

  return (
    <div>
      <RenderCondition
        condition={isLoading}
        elseContent={
          <div>
            {data?.map((item) => (
              <button
                type="button"
                className="w-full rounded-lg hover:bg-primary-50/30"
                key={item.id}
                onClick={() => handleNavigate(item)}
                aria-label={`User ${renderFullName(item?.firstName, item?.lastName)}`}
              >
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <User
                    info={{
                      avatar: item?.avatar,
                      email: renderFullName(item?.firstName, item?.lastName),
                    }}
                  />
                  <ArrowSquareOut className="color-contract-light" />
                </div>
              </button>
            ))}
          </div>
        }
        ifContent={
          <ArrayRepeater vertical length={5}>
            <SkeletonUser />
          </ArrayRepeater>
        }
      />
    </div>
  );
}
