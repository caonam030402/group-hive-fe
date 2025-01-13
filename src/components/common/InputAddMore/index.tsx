import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiX } from "@react-icons/all-files/fi/FiX";
import React, { useState } from "react";
import {
  Controller,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/libs/utils";

interface IProps {
  name?: string;
  initLength?: number;
  max?: number;
  isScrollList?: boolean;
  maxHeight?: number;
  form: UseFormReturn<FieldValues, any, undefined>;
}

export default function InputAddMore({
  name = "email",
  initLength = 2,
  max = 5,
  isScrollList = false,
  maxHeight = 300,
  form,
}: IProps) {
  const [list, setList] = useState<{ id: number; name: string }[]>(() => {
    return Array.from({ length: initLength }, (_, index) => ({
      id: index,
      name: `${name}${index}`,
    }));
  });

  const [deletedItems, setDeletedItems] = useState<Set<number>>(new Set());

  const handleDelete = (id: number) => {
    setDeletedItems((prevDeleted) => {
      const newDeleted = new Set(prevDeleted);
      newDeleted.add(id);
      return newDeleted;
    });
  };

  const handleAdd = () => {
    setList((prevList) => {
      const newId = prevList.length;
      return [...prevList, { id: newId, name: `${name}${newId}` }];
    });
  };

  const visibleList = list.filter((item) => !deletedItems.has(item.id));

  const conditionLimit = visibleList.length >= max;

  return (
    <div className="flex flex-col gap-3">
      <div
        style={{
          maxHeight: isScrollList ? `${maxHeight}px` : undefined,
        }}
        className="scroll scroll-visible flex flex-col gap-3"
      >
        {visibleList.map((item) => (
          <Controller
            control={form.control}
            key={item.id}
            rules={{
              required: {
                value: true,
                message: `${name} is required`,
              },
            }}
            render={({ field: { onChange } }) => (
              <Input
                key={item.id}
                errorMessage={form.formState.errors[
                  item.name
                ]?.message?.toString()}
                isInvalid={!!form.formState.errors[item.name]?.message}
                onChange={onChange}
                classNames={{ inputWrapper: "pr-1" }}
                placeholder={`Enter ${name}`}
                endContent={
                  visibleList.length > 1 && (
                    <Button
                      onPress={() => handleDelete(item.id)}
                      variant="light"
                      isIconOnly
                      size="sm"
                    >
                      <FiX />
                    </Button>
                  )
                }
              />
            )}
            name={item.name}
          />
        ))}
      </div>

      <button
        disabled={conditionLimit}
        onClick={handleAdd}
        type="button"
        className={cn(
          "mt-2 flex cursor-pointer items-center gap-2 p-0 text-sm text-primary transition-all hover:opacity-80",
          {
            "opacity-50 hover:opacity-50 cursor-not-allowed text-zinc-600":
              conditionLimit,
          },
        )}
      >
        <FiPlus />
        Add More
      </button>
    </div>
  );
}
