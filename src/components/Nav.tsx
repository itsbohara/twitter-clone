import { ReactNode } from "react";
import TweetDialog from "@ui/radix/TweetDialog";
import MoreNavPopoverMenu from "@ui/popovers/MoreNavPopoverMenu";
import NavItem from "@ui/NavItem";
import AccountNavItem from "@ui/AccountNavItem";

import { SiTwitter } from "react-icons/si";
import useAuth from "@hook/useAuth";
import { useRouter } from "next/router";
import {
  HiOutlineHome,
  HiHashtag,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineBookmark,
  HiOutlineUser,
} from "react-icons/hi2";
import { GoVerified } from "react-icons/go";
import GetVerified from "./modals/GetVerified";
import { useModalAction } from "@ctx/ModalContext";

interface NavLinkItem {
  href: string;
  text: string;
  icon?: ReactNode;
  guest?: boolean;
}

const items: NavLinkItem[] = [
  {
    href: "/",
    text: "Home",
    icon: <HiOutlineHome className="w-6 h-6" />,
    guest: true,
  },
  {
    href: "/explore",
    text: "Explore",
    icon: <HiHashtag className="w-6 h-6" />,
    guest: true,
  },
  {
    href: "/notifications",
    text: "Notifications",
    icon: <HiOutlineBell className="w-6 h-6" />,
    //  TODO : notifications count badge
    // icon: (
    //   <>
    //     <div className="relative">
    //       <HiOutlineBell className="w-6 h-6" />
    //       <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
    //         20
    //       </div>
    //     </div>
    //   </>
    // ),
  },
  {
    href: "/messages",
    text: "Messages",
    icon: <HiOutlineEnvelope className="w-6 h-6" />,
  },
  {
    href: "/bookmarks",
    text: "Bookmarks",
    icon: <HiOutlineBookmark className="w-6 h-6" />,
  },
];

const Nav = () => {
  const { isAuthenticated, user } = useAuth();
  const { asPath, pathname } = useRouter();
  const { openModal } = useModalAction()

  const isPathActive = (path: String) => pathname === path;
  function openVerifyModal() {
    openModal('GET_VERIFIED')
  }
  return (
    <header
      className={`hidden sm:flex w-24 xl:col-span-2 ${!isAuthenticated ? "max-lg:justify-end" : ""
        }`}
    >
      <div className="flex flex-1 xl:w-60 flex-col fixed h-full">
        <div className="flex flex-col flex-1 max-xl:items-center">
          <NavItem href="/" width="inline" size="default">
            <SiTwitter className="w-8 h-8 text-[#1da1f2]" />
          </NavItem>
          {items.map(({ href, text, icon, guest }, i) => {
            if (!guest && !isAuthenticated) return;
            const navActive = isPathActive(href);
            return (
              <div
                key={`header-${i}`}
                // value={`item-${i + 1}`}
                className="rounded-lg focus:outline-none overflow-hidden"
              >
                <NavItem href={href} width="inline" size="default">
                  {icon}
                  <div
                    className={`hidden xl:inline-flex flex-none text-lg ${navActive ? "font-bold" : "font-medium"
                      }`}
                  >
                    {text}
                  </div>
                </NavItem>
              </div>
            );
          })}
          {isAuthenticated && (
            <>
              {!user?.subscription?.verified &&
                <NavItem button width="inline" onClick={openVerifyModal}>
                  <GoVerified className="w-6 h-6" />
                  <div
                    className={"hidden xl:inline-flex flex-none text-lg font-medium"}
                  >
                    Get Verified
                  </div>
                </NavItem>
              }
              <NavItem
                href={`/${user?.username ?? "profile"}`}
                width="inline"
                size="default"
              >
                <HiOutlineUser className="w-6 h-6" />
                <div
                  className={`hidden xl:inline-flex flex-none text-lg font-medium ${asPath.includes(user!.username)
                    ? "font-bold"
                    : "font-medium"
                    }`}
                >
                  Profile
                </div>
              </NavItem>
              <MoreNavPopoverMenu />
              <TweetDialog />
            </>
          )}
        </div>

        {isAuthenticated && (
          <div>
            <AccountNavItem />
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
