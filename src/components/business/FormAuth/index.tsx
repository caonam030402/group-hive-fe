import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FiEye } from "@react-icons/all-files/fi/FiEye";
import { FiEyeOff } from "@react-icons/all-files/fi/FiEyeOff";
import { FiLock } from "@react-icons/all-files/fi/FiLock";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import AuthWithProvider from "@/components/business/AuthWithProvider";

import type { FormType } from "../../../app/[locale]/(auth)/register/page";

interface IProps {
  handleSubmitMail: (data: any) => void;
  isLoading: boolean;
  form: UseFormReturn<FormType, any, undefined>;
  title?: string;
  labelAction?: string;
  description?: React.ReactNode;
}

export default function FormSignUp({
  handleSubmitMail,
  isLoading,
  form,
  title = "Create account",
  labelAction = "Sign in",
  description,
}: IProps) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = handleSubmit((data) => {
    handleSubmitMail(data);
  });

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-[600px] space-y-6">
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Input
            size="md"
            placeholder="name@work.com"
            isInvalid={!!errors.email?.message}
            type="email"
            startContent={
              <IoMailOutline className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            {...form.register("email")}
          />
          <Input
            size="md"
            errorMessage={errors.password?.message}
            placeholder="******************"
            isInvalid={!!errors.password?.message}
            startContent={
              <FiLock className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FiEyeOff className="pointer-events-none text-xl text-default-400" />
                ) : (
                  <FiEye className="pointer-events-none text-xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            {...register("password")}
          />
          <Button
            isLoading={isLoading}
            type="submit"
            size="md"
            className="w-full"
            color="primary"
          >
            {labelAction}
          </Button>
        </form>
        <AuthWithProvider />
        {description}
      </div>
    </div>
  );
}
