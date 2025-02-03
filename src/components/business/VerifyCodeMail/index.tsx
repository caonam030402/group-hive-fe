"use client";

import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { IoChevronBackOutline } from "@react-icons/all-files/io5/IoChevronBackOutline";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { STEP_FORM_AUTH } from "@/app/[locale]/(auth)/register/constant";
import { signOut } from "@/configs/auth";
import { ENameLocalS } from "@/constants";
import { cn } from "@/libs/utils";
import type { IRequestConfirmOtp } from "@/types/auth";
import { clearLocalStorage } from "@/utils/clientStorage";
import { formatEmailHide } from "@/utils/helpers";

interface IProps {
  email: string;
  setStep?: React.Dispatch<React.SetStateAction<STEP_FORM_AUTH>>;
  handleConfirmOtp: (body: IRequestConfirmOtp, userId: number) => void;
  isLoadingOtp: boolean;
  userId: number | undefined;
  isLogout?: boolean;
  handleResendOtp: (userId: number) => void;
}

export default function VerifyCodeMail({
  email = "caonam81@gmail.com",
  setStep,
  handleConfirmOtp,
  handleResendOtp,
  isLogout = false,
  userId,
  isLoadingOtp,
}: IProps) {
  const maxLength = 6;
  const secondsRemaining = 60;
  const [timeRemaining, setTimeRemaining] = React.useState(secondsRemaining);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const isDisabledResend = useMemo(() => {
    return timeRemaining !== 0;
  }, [timeRemaining]);

  const onSubmit = (data: { otp: string }) => {
    handleConfirmOtp(
      {
        user: {
          id: userId || 0,
        },
        code: Number(data.otp),
      },
      userId || 0,
    );
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  const handleLogout = () => {
    signOut();
    clearLocalStorage({ key: ENameLocalS.PROFILE });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-1 flex-col items-center justify-center"
    >
      <div className="w-full max-w-[600px]">
        <Button
          className="mb-3 min-w-0 gap-1 px-1 py-0 text-sm"
          size="sm"
          variant="light"
          onPress={() =>
            isLogout ? handleLogout() : setStep?.(STEP_FORM_AUTH.FORM_AUTH)
          }
        >
          <IoChevronBackOutline /> {isLogout ? "Logout" : "Back"}
        </Button>
        <h1 className="text-2xl font-bold ">Enter verification code</h1>
        <div className="my-2">
          A 6-digit code was sent to {formatEmailHide(email)}. Enter it within
          10 minutes.
        </div>

        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOtp
              {...field}
              errorMessage={errors.otp && errors.otp.message}
              isInvalid={!!errors.otp}
              classNames={{ segmentWrapper: "gap-x-6", segment: "w-14 h-14" }}
              variant="faded"
              fullWidth
              size="lg"
              name="otp"
              length={maxLength}
            />
          )}
          rules={{
            required: "OTP is required",
            minLength: {
              value: 6,
              message: "Please enter a valid OTP",
            },
          }}
        />

        <button
          type="button"
          onClick={() => {
            if (isDisabledResend) return;
            handleResendOtp(userId || 0);
            setTimeRemaining(secondsRemaining);
          }}
          className={cn(
            "mt-2 flex cursor-pointer items-center gap-1 text-primary",
            isDisabledResend && "cursor-not-allowed opacity-50",
          )}
        >
          {!isDisabledResend ? (
            <>Resend code</>
          ) : (
            <>Resend code {`${timeRemaining}s`}</>
          )}
        </button>
        <Button
          type="submit"
          isLoading={isLoadingOtp}
          color="primary"
          className="mt-5 w-full"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
