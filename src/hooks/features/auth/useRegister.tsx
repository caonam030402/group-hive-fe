import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { STEP_FORM_AUTH } from "@/app/[locale]/(auth)/register/constant";
import { authService } from "@/services";
import type { IAuthErrorResponse } from "@/types/auth";
import type { IFormTypeAuth, IFormTypeRegister } from "@/types/form";
import authValidation from "@/validations/authValidation";

import useVerifyOTP from "./useVerifyOTP";

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

export default function useRegister() {
  const [step, setStep] = useState(STEP_FORM_AUTH.FORM_AUTH);
  const emailRef = useRef<string | null>(null);
  const userId = useRef<number | null>(null);
  const { handleConfirmOtp, handleResendOtp, isLoadingAuth } = useVerifyOTP();
  const { isPending, mutate } = authService.useRegisterWithEmail();

  const form = useForm<IFormTypeAuth>({
    resolver: zodResolver(rules),
  });

  const handleSubmitMail = (body: IFormTypeRegister) => {
    mutate(body, {
      onError: (error) => {
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
  return {
    step,
    form,
    isPending,
    handleSubmitMail,
    handleResendOtp,
    userId,
    isLoadingAuth,
    handleConfirmOtp,
    setStep,
    emailRef,
  };
}
