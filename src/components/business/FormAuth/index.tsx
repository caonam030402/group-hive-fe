import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  EnvelopeSimple,
  Eye,
  EyeSlash,
  Lock,
  User,
} from "@phosphor-icons/react";
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
              <EnvelopeSimple className="pointer-events-none shrink-0 text-xl text-default-400" />
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
                  <User className="pointer-events-none shrink-0 text-xl text-default-400" />
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
              <Lock className="pointer-events-none shrink-0 text-xl text-default-400" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityPassword}
                aria-label="toggle password visibility"
              >
                {isVisiblePassWord ? (
                  <EyeSlash className="pointer-events-none text-xl text-default-400" />
                ) : (
                  <Eye className="pointer-events-none text-xl text-default-400" />
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
                <Lock className="pointer-events-none shrink-0 text-xl text-default-400" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConfirmPassword}
                  aria-label="toggle password visibility"
                >
                  {isVisibleConfirmPassWord ? (
                    <EyeSlash className="pointer-events-none text-xl text-default-400" />
                  ) : (
                    <Eye className="pointer-events-none text-xl text-default-400" />
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
