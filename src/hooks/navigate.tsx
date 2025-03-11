import { usePathname, useSearchParams } from "next/navigation";
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

  const createQueryString = useCallback(
    (paramsList?: IParamsList[]) => {
      const params = new URLSearchParams(searchParams.toString());

      paramsList?.forEach(({ name, value }) => {
        params.set(name, value);
      });

      return params.toString();
    },
    [searchParams],
  );

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
  return { navigate, pathname, searchParams, createQueryString, router };
}
