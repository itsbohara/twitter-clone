import * as PopoverPrimitive from "@radix-ui/react-popover";

import cx from "classnames";
import { ReactNode, useState } from "react";
import NavItem from "@ui/NavItem";

import { HiOutlineArrowPath } from "react-icons/hi2";
import { useAppDispatch } from "@hook/useApp";
import { onDeleteTweet } from "@redux/slices/tweet.slice";
import { AiOutlineEdit } from "react-icons/ai";
import http from "@/client/axios";
import classNames from "classnames";
import { MenuItem } from "@/types/menuItem";


export default function ReTweetMenu({
  tweetID,
  retweetByMe = false,
  retTweetID,
  count,
}:
  {
    retweetByMe?: boolean;
    tweetID?: string;
    retTweetID?: string;
    count?: number;
    postDeleteFunc?: () => void;
  }) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleTweetReTweet = async (e) => {
    e?.stopPropagation();
    setOpen(false);
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
            <HiOutlineArrowPath className="w-5 h-5" />
          </div>
          <span className="ml-1">{count}</span>
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
