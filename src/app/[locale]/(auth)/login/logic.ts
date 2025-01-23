import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authCredential } from "@/configs/auth";
import { ETriggerCredentials, PATH } from "@/constants";
import useWorkspace from "@/hooks/useWorkspace";
import type { IFormTypeAuth, IFormTypeLogin } from "@/types/form";
import authValidation from "@/validations/authValidation";

const rules = authValidation.pick({ email: true, password: true });

export default function useLogin() {
  const { workspaceId } = useWorkspace();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<IFormTypeAuth>({
    resolver: zodResolver(rules),
  });

  const handleLogin = async (body: IFormTypeLogin) => {
    setIsLoading(true);

    const res = await authCredential<IFormTypeLogin>({
      trigger: ETriggerCredentials.LOGIN,
      email: body.email,
      password: body.password,
    });

    const error = JSON.parse(res?.error || "{}");
    if (res?.error) {
      Object.keys(error || {}).forEach((key) => {
        toast.error(error?.[key]);
        form.setError(key as keyof IFormTypeLogin, {
          message: error?.[key],
        });
      });

      setIsLoading(false);
    } else {
      const isHasIdWS = !!workspaceId;
      toast.success("Login successfully !");
      setIsLoading(false);
      router.push(isHasIdWS ? PATH.WORKPLACE : PATH.HOME);
    }
  };
  return {
    form,
    isLoading,
    handleLogin,
  };
}
