import { ENameLocalS } from "@/constants";
import useQueryCommon from "@/hooks/useQuery";
import { getLocalStorage, setLocalStorage } from "@/utils/clientStorage";
import http from "@/utils/http";

export const userService = {
  useProfile: () => {
    const userLs = getLocalStorage({ key: ENameLocalS.PROFILE });
    const query = useQueryCommon({
      queryFn: () => http.get<IUser>("auth/me"),
      queryKey: ["profile"],
      enabled: !userLs,
    });
    setLocalStorage({ key: ENameLocalS.PROFILE, value: query.data?.payload });
    return {
      ...query,
      user: (userLs as IUser) || (query.data?.payload as IUser),
    };
  },
};
