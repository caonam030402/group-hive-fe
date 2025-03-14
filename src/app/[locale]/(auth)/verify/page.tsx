"use client";

import React, { useEffect } from "react";

import VerifyCodeMail from "@/components/business/VerifyCodeMail";
import useVerifyOTP from "@/hooks/features/auth/useVerifyOTP";
import { userService } from "@/services/user";

import IntroSection from "../login/IntroSection";

export default function Verify() {
  const { handleConfirmOtp, handleResendOtp, isLoadingAuth } = useVerifyOTP();
  const { user } = userService.useProfile();

  useEffect(() => {
    if (!user?.id) return;
    handleResendOtp(user?.id || 0);
  }, [handleResendOtp, user?.id]);

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
