import { ENameLocalS } from "@/constants";
import { useQueryCommon } from "@/hooks/useQuery";
import { getLocalStorage, setLocalStorage } from "@/utils/clientStorage";
import http from "@/utils/http";

export const userService = {
  useProfile: () => {
    const userLs = getLocalStorage({ key: ENameLocalS.PROFILE });
    const query = useQueryCommon<IUser>({
      queryFn: async () => {
        const response = await http.get<IUser>("auth/me");
        return response.payload;
      },
      queryKey: ["profile"],
      enabled: !userLs,
    });
    setLocalStorage({ key: ENameLocalS.PROFILE, value: query.data });
    return {
      ...query,
      user: (userLs as IUser) || (query.data as IUser),
    };
  },
};
