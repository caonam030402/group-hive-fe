import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

import UserSetting from "@/components/business/UserSetting";
import Logo from "@/components/common/Logo";
import RenderCondition from "@/components/common/RenderCondition";
import { userMenuOptionsHome } from "@/constants";
import { PATH } from "@/constants/common";

const listNav = [
  {
    title: "Product",
    link: "/",
  },
  {
    title: "Solutions",
    link: "/",
  },
  {
    title: "Blog",
    link: "/",
  },
  {
    title: "Trust",
    link: "/",
  },
  {
    title: "Pricing",
    link: "/",
  },
];

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  return (
    <Navbar maxWidth="xl">
      <NavbarBrand>
        <Link href={PATH.HOME}>
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-9 sm:flex" justify="start">
        {listNav.map((nav) => {
          return (
            <Link
              className="text-[15px] font-medium text-gray-800"
              href={nav.link}
              key={nav.title}
            >
              {nav.title}
            </Link>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!isLoading && (
            <RenderCondition
              condition={!!session}
              ifContent={
                <UserSetting
                  placement="bottom"
                  info={{
                    email: session?.user?.email,
                    avatar: session?.user?.avatar,
                  }}
                  menuOptions={userMenuOptionsHome}
                />
              }
              elseContent={
                <Button as={Link} color="primary" href={PATH.REGISTER}>
                  Sign Up
                </Button>
              }
            />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
