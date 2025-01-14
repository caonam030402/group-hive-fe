import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { authGenerateOtp } from "@/apis/auth";
import { authCredential } from "@/configs/auth/action";
import { ENameLocalS, PATH } from "@/constants";
import { ETriggerCredentials } from "@/constants/auth";
import type { IErrorResponse } from "@/types";
import type { IRequestConfirmOtp } from "@/types/auth";
import { getLocalStorage } from "@/utils/clientStorage";

import useApi from "./useApi";

export default function useAuth() {
  const router = useRouter();
  const { fetch, isLoading: isLoadingAuth, setIsLoading } = useApi();
  const { update } = useSession();
  const handleConfirmOtp = async (body: IRequestConfirmOtp, userId: number) => {
    setIsLoading(true);
    const res = await authCredential({
      trigger: ETriggerCredentials.OTP,
      userId,
      code: body.code,
    });

    if (res?.error) {
      setIsLoading(false);
      toast.error(res.error);
      return;
    }

    toast.success("Verify OTP successfully !");

    const isHasIdWS = getLocalStorage({ key: ENameLocalS.WORKSPACE_ID });
    router.push(isHasIdWS ? PATH.WORKPLACE : PATH.HOME);

    setIsLoading(false);
    router.push("/");
    update();
  };

  const handleResendOtp = (userId: number) => {
    fetch({
      fn: authGenerateOtp({
        user: { id: userId || 0 },
        expiresTime: 60,
      }),

      onError: (error) => {
        const errorResponse = error.payload as IErrorResponse | null;
        toast.error(errorResponse!.message);
      },

      onSuccess: () => {
        toast.success("Resend OTP successfully !");
      },
    });
  };

  return {
    handleConfirmOtp,
    handleResendOtp,
    isLoadingAuth,
  };
}
