import Avatar from "@rd/Avatar";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import Link from "next/link";

import useAuth from "@/hooks/useAuth";
import { getNameInitials } from "@/utils/string";
import NavItem from "@ui/NavItem";

import { ReactNode } from "react";

import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { BsPersonPlus } from "react-icons/bs";

interface NavLinkItem {
  href: string;
  text: string;
  icon?: ReactNode;
}

const items: NavLinkItem[] = [
  {
    href: "/auth/login/plus",
    text: "Add an existing account",
    icon: <BsPersonPlus className="w-6 h-6" />,
  },
  {
    href: "/auth/logout",
    text: "Log out",
    icon: <IoMdLogOut className="w-6 h-6" />,
  },
];

const AccountNavItem = () => {
  const { user } = useAuth();

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <div className="flex flex-1 items-center gap-x-2 px-4 py-8 [&_div:first-child]:rounded-full hover:cursor-pointer">
          <div className="flex flex-1 items-center p-2 hover:bg-slate-100">
            <div className="flex items-center gap-x-3 flex-1 ">
              <div className="flex flex-1 xl:flex-none justify-center xl:justify-start">
                <Avatar
                  src={user?.profile}
                  alt={user?.name}
                  initials={getNameInitials(user?.name)}
                />
              </div>
              <div className="hidden xl:flex flex-col">
                <p className="text-base font-semibold truncate">{user?.name}</p>
                <p className="text-sm text-slate-600 font-medium">
                  @{user?.username}
                </p>
              </div>
            </div>
            <div className="hidden xl:flex">
              <Link href="/">
                <HiOutlineEllipsisHorizontal className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          side="top"
          sideOffset={-60}
          alignOffset={0}
          className="PopoverContent overflow-hidden w-80 rounded-xl shadow-xl border border-slate-200 bg-white"
        >
          <div className="flex flex-col">
            {items.map(({ href, text, icon }, i) => (
              <NavItem
                key={`header-${i}`}
                href={href}
                width="full"
                size="default"
              >
                {icon}
                <div className="inline-flex flex-none text-lg font-medium">
                  {text}
                </div>
              </NavItem>
            ))}
          </div>

          <SeparatorPrimitive.Root className="h-px bg-slate-200 border-0" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default AccountNavItem;
