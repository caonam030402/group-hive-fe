import { signOut } from "@/configs/auth";
import { clearLocalStorage } from "@/utils/clientStorage";

import { ENameLocalS } from "./common";

export const userMenuOptions: IMenuUserOption[] = [
  {
    id: "0",
    title: "Account Management",
    children: [
      {
        id: "1",
        title: "Profile",
        href: "workplace/profile",
        icon: "",
      },
      {
        id: "2",
        title: "My QR Code and Profile Link",
        href: "workplace/qr-code",
        icon: "",
      },
    ],
  },
  {
    id: "3",
    title: "Support and Settings",
    children: [
      {
        id: "4",
        title: "Contact Us",
        href: "workplace/contact",
        icon: "",
      },
      {
        id: "5",
        title: "Settings",
        href: "workplace/settings",
        icon: "",
      },
      {
        id: "6",
        title: "Log Out",
        href: "",
        action: () => {
          clearLocalStorage({ key: ENameLocalS.PROFILE });
          signOut();
        },
        icon: "",
      },
    ],
  },
];

export const userMenuOptionsHome: IMenuUserOption[] = [
  {
    id: "0",
    children: [
      {
        id: "1",
        title: "Get Started",
        href: "workplace/profile",
        icon: "",
      },
      {
        id: "2",
        title: "Workplace",
        href: "workplace/qr-code",
        icon: "",
      },
    ],
  },
  {
    id: "3",
    children: [
      {
        id: "6",
        title: "Log Out",
        href: "",
        action: () => {
          clearLocalStorage({ key: ENameLocalS.PROFILE });
          signOut();
        },
        icon: "",
      },
    ],
  },
];
