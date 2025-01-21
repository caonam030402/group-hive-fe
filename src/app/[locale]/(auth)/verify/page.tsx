"use client";

import React from "react";

import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import useAuth from "@/hooks/useAuth";
import { userService } from "@/services/user";

import IntroSection from "../login/IntroSection";

export default function Verify() {
  const { handleConfirmOtp, handleResendOtp, isLoadingAuth } = useAuth();
  const { user } = userService.useProfile();
  return (
    <div>
      <section className="flex h-screen text-sm">
        <IntroSection />
        <VerifyCodeMail
          handleResendOtp={handleResendOtp}
          userId={user?.id}
          isLogout
          isLoadingOtp={isLoadingAuth}
          handleConfirmOtp={handleConfirmOtp}
          email={user?.email || ""}
        />
      </section>
    </div>
  );
}
