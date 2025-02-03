import { ArrowSquareOut } from "@phosphor-icons/react";
import React from "react";

import ArrayRepeater from "@/components/common/ArrayRepeater";
import RenderCondition from "@/components/common/RenderCondition";
import User from "@/components/common/User";
import SkeletonUser from "@/components/skeleton/SkeletonUser";
import useWorkspace from "@/hooks/useWorkspace";
import { workspaceService } from "@/services";
import { renderFullName } from "@/utils/helpers";

export default function TabMember() {
  const { workspaceId } = useWorkspace();
  const { data, isLoading } = workspaceService.useGetMembers(workspaceId);
  return (
    <div>
      <RenderCondition
        condition={isLoading}
        elseContent={
          <div>
            {data?.map((item) => (
              <div className="rounded-lg hover:bg-primary-50/30" key={item.id}>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <User
                    info={{
                      avatar: item?.avatar,
                      email: renderFullName(item?.firstName, item?.lastName),
                    }}
                  />
                  <ArrowSquareOut className="color-contract-light" />
                </div>
              </div>
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
