import React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import InputAddMore from "@/components/common/InputAddMore";
import { emailRules } from "@/validations";

export interface IProps {
  form: UseFormReturn<FieldValues, any, undefined>;
}

export default function ViaEmail({ form }: IProps) {
  return (
    <div className="">
      <p className="mb-3 text-[13px]">
        Add members to the organization via email. After clicking Send, members
        will receive an email notification
      </p>
      <InputAddMore
        isCheckDuplicate
        isScrollList
        form={form}
        rules={emailRules}
        name="email"
        max={20}
        initLength={2}
      />
    </div>
  );
}
