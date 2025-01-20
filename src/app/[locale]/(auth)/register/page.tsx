"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@nextui-org/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authService } from "@/apis/auth";
import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { PATH } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import type { IAuthErrorResponse } from "@/types/auth";
import type { IFormTypeAuth, IFormTypeRegister } from "@/types/form";
import authValidation from "@/validations/authValidation";

import FormAuth from "../../../../components/business/FormAuth";
import { STEP_FORM_AUTH } from "./constant";
import IntroSection from "./IntroSection";

const rules = authValidation
  .pick({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export default function SignIn() {
  const [step, setStep] = useState(STEP_FORM_AUTH.FORM_AUTH);
  const emailRef = useRef<string | null>(null);
  const userId = useRef<number | null>(null);
  // const { fetch, isLoading } = useApi();
  const { handleConfirmOtp, handleResendOtp, isLoadingAuth } = useAuth();
  const { isPending, mutate } = authService.useRegisterWithEmail();

  const form = useForm<IFormTypeAuth>({
    resolver: zodResolver(rules),
  });

  const handleSubmitMail = (body: IFormTypeRegister) => {
    mutate(body, {
      onError: (error) => {
        console.log(error);
        const errorResponse = error as IAuthErrorResponse;
        const errors = errorResponse?.errors;
        setStep(STEP_FORM_AUTH.FORM_AUTH);

        // Set message error from server
        if (errors) {
          Object.keys(errors || {}).forEach((key) => {
            form.setError(key as keyof IFormTypeRegister, {
              message: errors?.[key],
            });
            toast.error(errors[key] as string);
          });
        }
      },
      onSuccess: (response) => {
        userId.current = Number(response.payload?.userId);
        toast.success("Success register please verify your email!");
        setStep(STEP_FORM_AUTH.VERIFY_CODE);
      },
    });
    emailRef.current = body.email;
  };

  const renderStep = () => {
    switch (step) {
      case STEP_FORM_AUTH.FORM_AUTH:
        return (
          <FormAuth
            labelAction="Sign Up for Free"
            title="Create account"
            form={form}
            isLoading={isPending}
            handleSubmitMail={handleSubmitMail}
            description={
              <div className="text-sm text-default-500">
                <span>If you already have an account, </span>
                <Link size="sm" href={PATH.LOGIN}>
                  Login
                </Link>
              </div>
            }
          />
        );
      case STEP_FORM_AUTH.VERIFY_CODE:
        return (
          <VerifyCodeMail
            handleResendOtp={handleResendOtp}
            userId={userId.current || 0}
            isLoadingOtp={isLoadingAuth}
            handleConfirmOtp={handleConfirmOtp}
            setStep={setStep}
            email={emailRef.current || ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex h-screen text-sm">
      <IntroSection />
      {renderStep()}
    </section>
  );
}
