import { PushPinSimple } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import Button from "@/components/common/Button";
import { keyRQ } from "@/constants/keyRQ";
import { docsHubService } from "@/services/docsHub";
import type { IDocsHub } from "@/types/docsHub";

export default function usePinsDocs() {
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

  return {
    PinButton,
    handleActionPins,
  };
}
