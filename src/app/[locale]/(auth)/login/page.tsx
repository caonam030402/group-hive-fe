"use client";

import { Link } from "@nextui-org/link";
import React from "react";

import FormAuth from "@/components/business/FormAuth";
import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import { PATH } from "@/constants/common";

import { STEP_FORM_AUTH } from "../register/constant";
import IntroSection from "./IntroSection";
import useLogin from "./logic";

export default function Login() {
  const {
    step,
    form,
    isLoading,
    handleLogin,
    handleResendOtp,
    userId,
    isLoadingAuth,
    handleConfirmOtp,
    setStep,
    emailRef,
  } = useLogin();

  const renderStep = () => {
    switch (step) {
      case STEP_FORM_AUTH.FORM_AUTH:
        return (
          <FormAuth
            form={form}
            isLogin
            isLoading={isLoading}
            handleSubmitMail={handleLogin}
            title="Login to your account"
            labelAction="Login"
            description={
              <div className="text-sm text-default-500">
                <span> If you don&apos;t have an account, </span>
                <Link size="sm" href={PATH.REGISTER}>
                  Register
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
      {renderStep()}
      <IntroSection />
    </section>
  );
}
