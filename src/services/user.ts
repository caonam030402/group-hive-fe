import { ENameLocalS } from "@/constants";
import { useQueryCommon } from "@/hooks/useQuery";
import type { IOptionRQ } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/utils/clientStorage";

export const userService = {
  useProfile: () => {
    const userLs = getLocalStorage({ key: ENameLocalS.PROFILE });
    const query = useQueryCommon<IUser>({
      url: "auth/me",
      queryKey: ["profile"],
      enabled: !userLs,
    });
    setLocalStorage({ key: ENameLocalS.PROFILE, value: query.data });
    return {
      ...query,
      user: (userLs as IUser) || (query.data as IUser),
    };
  },
  useGetOneUser: (userId: IUser["id"], option?: IOptionRQ) => {
    const query = useQueryCommon<IUser>({
      url: `users/${userId}`,
      queryKey: ["user", userId],
      ...option,
    });

    return {
      ...query,
      data: query.data,
    };
  },
};
