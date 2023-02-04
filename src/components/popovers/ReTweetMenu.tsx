import * as PopoverPrimitive from "@radix-ui/react-popover";

import cx from "classnames";
import { useState } from "react";
import NavItem from "@ui/NavItem";

import { HiOutlineArrowPath } from "react-icons/hi2";
import { useAppDispatch } from "@hook/useApp";
import { onDeleteTweet } from "@redux/slices/tweet.slice";
import { AiOutlineEdit } from "react-icons/ai";
import http from "@/client/axios";
import classNames from "classnames";
import { MenuItem } from "@/types/menuItem";
import useAuth from "@hook/useAuth";
import { useModalAction } from "@ctx/ModalContext";


export default function ReTweetDropdownMenu({
  tweetID,
  tweetUserName,
  retweetByMe = false,
  retTweetID,
  count,
  showCount = true,
  menuIconStyle
}:
  {
    retweetByMe?: boolean;
    tweetUserName?: string;
    showCount?: boolean;
    tweetID?: string;
    retTweetID?: string;
    count?: number;
    postDeleteFunc?: () => void;
    menuIconStyle?: string
  }) {
  const { isAuthenticated } = useAuth()
  const { openModal } = useModalAction()
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleTweetReTweet = async (e) => {
    e?.stopPropagation();
    setOpen(false);
    if (!isAuthenticated) {
      openModal("AUTH_BOARDING", {
        icon: <HiOutlineArrowPath className="w-12 h-12 text-green-600" />,
        title: 'Retweet to spread the word.',
        desc: `When you join Twitter, you can share ${tweetUserName}’s Tweet with your followers.`
      })
      return;
    }


    const res = await http.post(`/tweet/${tweetID}/retweet`);
    if (res.status === 204) dispatch(onDeleteTweet(retTweetID))
  };
  const onQuoteTweet = (e) => {
    e?.stopPropagation();
    setOpen(false);
  };
  const items: MenuItem[] | any = [
    {
      click: handleTweetReTweet,
      text: `${retweetByMe ? "Undo" : ''} Retweet`,
      width: "full",
      size: "small",
      icon: <HiOutlineArrowPath className="w-4 h-4" />,
    },
    {
      click: onQuoteTweet,
      text: "Quote Tweet",
      width: "full",
      size: "small",
      icon: <AiOutlineEdit className="w-4 h-4" />,
    },
    ,
  ];
  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <PopoverPrimitive.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <div className={classNames("flex items-center hover:text-[#1d9bf0] cursor-pointer",
          retweetByMe ? 'text-green-600' : '')}>
          <div className="relative">
            <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
            <HiOutlineArrowPath className={classNames("w-5 h-5", menuIconStyle)} />
          </div>
          {showCount && <span className="ml-1">{count}</span>}
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={-40}
          alignOffset={0}
          align="center"
          className={cx(
            "DropdownMenuContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "rounded-lg shadow-2xl w-40 overflow-hidden",
            "bg-white border border-slate-200"
          )}
        >
          {items.map(({ href, text, width, size, icon, click, variant }, i) => (
            <div
              key={`header-${i}`}
              // value={`item-${i + 1}`}
              className="focus:outline-none overflow-hidden"
            >
              {click ? (
                <NavItem
                  onClick={click}
                  width={width}
                  size={size}
                  variant={variant}
                >
                  {icon}
                  <div className="inline-flex flex-none text-lg font-medium">
                    {text}
                  </div>
                </NavItem>
              ) : (
                <NavItem
                  href={href}
                  width={width}
                  size={size}
                  variant={variant}
                >
                  {icon}
                  <div className="inline-flex flex-none text-lg font-medium">
                    {text}
                  </div>
                </NavItem>
              )}
            </div>
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
