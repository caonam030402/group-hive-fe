import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import UserSetting from "@/components/business/UserSetting";
import Logo from "@/components/common/Logo";
import RenderCondition from "@/components/common/RenderCondition";
import { userMenuOptionsHome } from "@/constants";
import { PATH } from "@/constants/common";
import { userService } from "@/services/user";

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
  const { user, isLoading } = userService.useProfile();
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
              condition={!!user}
              ifContent={
                <UserSetting
                  placement="bottom"
                  info={{
                    email: user?.email,
                    avatar: user?.avatar,
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
