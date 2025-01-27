import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { AppConfig } from "@/configs/main/appConfig";
import { isClient } from "@/utils/common";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});

export const hostUrl =
  isClient && `${window.location.protocol}//${window.location.host}`;
