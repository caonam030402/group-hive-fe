import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { useRouter } from "@/libs/i18nNavigation";

interface IParamsList {
  name: string;
  value: string;
}
export default function useNavigate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = useParams();

  const createQueryString = useCallback(
    (paramsList?: IParamsList[]) => {
      const paramsNew = new URLSearchParams(searchParams.toString());

      paramsList?.forEach(({ name, value }) => {
        paramsNew.set(name, value);
      });

      return paramsNew.toString();
    },
    [searchParams],
  );

  const getDynamicRoute = useCallback(() => {
    return params.menu?.at(-1);
  }, [params]);

  const navigate = useCallback(
    ({
      paramsList,
      customUrl,
    }: {
      paramsList?: IParamsList[];
      customUrl?: string;
    }): void => {
      const queryString = createQueryString(paramsList);
      router.push(`${customUrl || pathname}?${queryString}`);
    },
    [createQueryString, pathname, router],
  );
  return {
    navigate,
    pathname,
    searchParams,
    createQueryString,
    router,
    getDynamicRoute,
  };
}
