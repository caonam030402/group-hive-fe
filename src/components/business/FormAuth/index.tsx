import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FiEye } from "@react-icons/all-files/fi/FiEye";
import { FiEyeOff } from "@react-icons/all-files/fi/FiEyeOff";
import { FiLock } from "@react-icons/all-files/fi/FiLock";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import AuthWithProvider from "@/components/business/AuthWithProvider";
import type { IFormTypeAuth } from "@/types/form";

interface IProps {
  handleSubmitMail: (data: any) => void;
  isLoading: boolean;
  form: UseFormReturn<IFormTypeAuth, any, undefined>;
  title?: string;
  labelAction?: string;
  description?: React.ReactNode;
  isLogin?: boolean;
}

export default function FormSignUp({
  handleSubmitMail,
  isLoading,
  form,
  title = "Create account",
  labelAction = "Sign in",
  description,
  isLogin,
}: IProps) {
  const [isVisiblePassWord, setIsVisiblePassWord] = useState(false);
  const [isVisibleConfirmPassWord, setIsVisibleConfirmPassWord] =
    useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form;

  const toggleVisibilityPassword = () =>
    setIsVisiblePassWord(!isVisiblePassWord);

  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassWord(!isVisibleConfirmPassWord);

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
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            type="email"
            startContent={
              <IoMailOutline className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            {...form.register("email")}
          />
          {!isLogin && (
            <div className="flex gap-3">
              <Input
                size="md"
                placeholder="first name"
                errorMessage={errors.firstName?.message}
                isInvalid={!!errors.firstName?.message}
                startContent={
                  <IoMailOutline className="pointer-events-none shrink-0 text-xl text-default-400" />
                }
                {...form.register("firstName")}
              />
              <Input
                size="md"
                placeholder="last name"
                errorMessage={errors.lastName?.message}
                isInvalid={!!errors.lastName?.message}
                {...form.register("lastName")}
              />
            </div>
          )}
          <Input
            size="md"
            errorMessage={errors.password?.message}
            placeholder="password"
            isInvalid={!!errors.password?.message}
            startContent={
              <FiLock className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityPassword}
                aria-label="toggle password visibility"
              >
                {isVisiblePassWord ? (
                  <FiEyeOff className="pointer-events-none text-xl text-default-400" />
                ) : (
                  <FiEye className="pointer-events-none text-xl text-default-400" />
                )}
              </button>
            }
            type={isVisiblePassWord ? "text" : "password"}
            {...register("password")}
          />
          {!isLogin && (
            <Input
              size="md"
              errorMessage={errors.confirmPassword?.message}
              placeholder="confirm password"
              isInvalid={!!errors.confirmPassword?.message}
              startContent={
                <FiLock className="pointer-events-none shrink-0 text-xl text-default-400" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConfirmPassword}
                  aria-label="toggle password visibility"
                >
                  {isVisibleConfirmPassWord ? (
                    <FiEyeOff className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <FiEye className="pointer-events-none text-xl text-default-400" />
                  )}
                </button>
              }
              type={isVisibleConfirmPassWord ? "text" : "password"}
              {...register("confirmPassword")}
            />
          )}
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
