import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { authCredential } from "@/configs/auth/action";
import { ENameLocalS, PATH } from "@/constants";
import { ETriggerCredentials } from "@/constants/auth";
import { authService } from "@/services/auth";
import type { IRequestConfirmOtp } from "@/types/auth";
import { getLocalStorage } from "@/utils/clientStorage";

export default function useVerifyOTP() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending } = authService.useGenerateOtp();

  const handleConfirmOtp = useCallback(
    async (body: IRequestConfirmOtp, userId: number) => {
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
    },
    [router],
  );

  const handleResendOtp = useCallback(
    (userId: number) => {
      mutate(
        {
          user: { id: userId || 0 },
          expiresTime: 60,
        },
        {
          onSuccess: () => {
            toast.success("Resend OTP successfully");
          },
        },
      );
    },
    [mutate],
  );

  return {
    handleConfirmOtp,
    handleResendOtp,
    isLoadingAuth: isLoading || isPending,
  };
}
