"use client";

import { Link } from "@heroui/link";
import React from "react";

import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { PATH } from "@/constants/common";
import useRegister from "@/hooks/features/auth/useRegister";

import FormAuth from "../../../../components/business/FormAuth";
import { STEP_FORM_AUTH } from "./constant";
import IntroSection from "./IntroSection";

export default function SignIn() {
  const {
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
  } = useRegister();
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
