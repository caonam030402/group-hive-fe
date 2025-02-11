import { ArrowSquareOut } from "@phosphor-icons/react";
import { useRouter } from "next-nprogress-bar";
import React from "react";

import ArrayRepeater from "@/components/common/ArrayRepeater";
import RenderCondition from "@/components/common/RenderCondition";
import User from "@/components/common/User";
import SkeletonUser from "@/components/skeletons/SkeletonUser";
import { MessageInit } from "@/enums/chat";
import useWorkspace from "@/hooks/useWorkspace";
import { useChatStore } from "@/providers/chatStoreProvider";
import { workspaceService } from "@/services";
import { renderFullName } from "@/utils/helpers";

interface IProps {
  onClose: () => void;
}

export default function TabMember({ onClose }: IProps) {
  const { workspaceId } = useWorkspace();
  const router = useRouter();

  const { setUserSelected } = useChatStore((state) => state);

  const { data, isLoading } = workspaceService.useGetMembers(workspaceId);
  const handleNavigate = (user: IUser) => {
    setUserSelected(user);
    onClose();
    router.push(
      `/workplace/messenger/${MessageInit.MESSAGE_ID_DEFAULT}?recipientId=${user.id}`,
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
