"use client";

import { Link } from "@heroui/link";
import React from "react";

import FormAuth from "@/components/business/FormAuth";
import { PATH } from "@/constants/common";
import useLogin from "@/hooks/features/auth/useLogin";

import IntroSection from "./IntroSection";

export default function Login() {
  const { form, isLoading, handleLogin } = useLogin();

  return (
    <section className="flex h-screen text-sm">
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
      <IntroSection />
    </section>
  );
}
