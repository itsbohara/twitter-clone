import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import cx from "classnames";
import { ReactNode } from "react";
import NavItem from "@ui/NavItem";

import {
  HiOutlineEllipsisHorizontal,
  HiOutlineFaceFrown,
  HiOutlineUserPlus,
  HiOutlineQueueList,
  HiOutlineSpeakerXMark,
  HiOutlineNoSymbol,
  HiCodeBracket,
  HiOutlineFlag,
} from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppDispatch } from "@hook/useApp";
import { deleteTweet } from "@redux/slices/tweet.slice";
import { setInfoNotice } from "@redux/slices/notice";
import { useState } from "react";
import { MenuItem } from "@/types/menuItem";

export default function TweetDropdownMenu({
  username,
  tweetID,
  tweetByOwner,
  isReply = false,
  postDeleteFunc,
}: {
  isReply?: boolean;
  postDeleteFunc?: Function;
  [key: string]: any;
}) {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();
  const handleTweetDelete = async (e) => {
    e?.stopPropagation();
    setOpen(false)
    await dispatch(deleteTweet(tweetID, { reply: isReply }));
    postDeleteFunc?.();
  };

  const noFeature = (e) => {
    e.stopPropagation();
    setOpen(false)
    dispatch(setInfoNotice({ message: "Not available!" }));
  };

  const followToggle = (e) => {
    e.stopPropagation();
    setOpen(false)

  }

  const items: MenuItem[] | any = [
    ...(tweetByOwner
      ? [
        {
          click: handleTweetDelete,
          text: "Delete",
          width: "full",
          size: "small",
          icon: <RiDeleteBinLine className="w-4 h-4" />,
          variant: "danger",
        },
      ]
      : [
        {
          click: noFeature,
          text: "This Tweet's not helpful",
          width: "full",
          size: "small",
          icon: <HiOutlineFaceFrown className="w-4 h-4" />,
        },
        {
          click: followToggle,
          text: `Follow @${username}`,
          width: "full",
          size: "small",
          icon: <HiOutlineUserPlus className="w-4 h-4" />,
        },
        {
          click: noFeature,
          text: `Add/remove @${username} from Lists`,
          width: "full",
          size: "small",
          icon: <HiOutlineQueueList className="w-4 h-4" />,
        },
        {
          click: noFeature,
          text: `Mute @${username}`,
          width: "full",
          size: "small",
          icon: <HiOutlineSpeakerXMark className="w-4 h-4" />,
        },
        {
          click: noFeature,
          text: `Block @${username}`,
          width: "full",
          size: "small",
          icon: <HiOutlineNoSymbol className="w-4 h-4" />,
        },
      ]),

    {
      click: noFeature,
      text: "Embed Tweet",
      width: "full",
      size: "small",
      icon: <HiCodeBracket className="w-4 h-4" />,
    },
    ...(tweetByOwner
      ? []
      : [
        {
          click: noFeature,
          text: "Report Tweet",
          width: "full",
          size: "small",
          icon: <HiOutlineFlag className="w-4 h-4" />,
        },
      ]),
  ];
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="IconButton hover:bg-slate-200 rounded-full"
          aria-label="Customize options"
        >
          <HiOutlineEllipsisHorizontal className="h-6 w-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={0}
          alignOffset={0}
          align="end"
          className={cx(
            "DropdownMenuContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "rounded-lg shadow-2xl w-80 overflow-hidden",
            "bg-white border border-slate-200"
          )}
        >
          {items.map(({ href, text, width, size, icon, click, variant }, i) => (
            <DropdownMenu.Item
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
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
