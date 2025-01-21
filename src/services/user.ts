import { useQuery } from "@tanstack/react-query";

import { ENameLocalS } from "@/constants";
import { getLocalStorage, setLocalStorage } from "@/utils/clientStorage";
import http from "@/utils/http";

export const userService = {
  useProfile: () => {
    const userLs = getLocalStorage({ key: ENameLocalS.PROFILE });
    const query = useQuery({
      queryFn: () => http.get<IUser>("auth/me"),
      queryKey: ["profile"],
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !userLs,
    });
    setLocalStorage({ key: ENameLocalS.PROFILE, value: query.data?.payload });
    return {
      ...query,
      user: userLs || query.data?.payload,
    };
  },
};
