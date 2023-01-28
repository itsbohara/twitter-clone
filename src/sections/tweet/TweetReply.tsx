import { useAppDispatch } from "@/hooks/useApp";
import { setInfoNotice } from "@/redux/slices/notice";
import { timeAgo } from "@/utils/date";
import TweetDropdownMenu from "@ui/radix/DropdownMenu";
import ProfileHoverCard from "@ui/radix/ProfileHoverCard";
import Image from "next/image";
import { useState } from "react";
import http from "@/client/axios";
import useAuth from "../../hooks/useAuth";
import { relativeCDNUrl } from "../../utils/url";
import {
  HiArrowUpTray,
  HiHeart,
  HiOutlineArrowPath,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";

export default function TweetReply({ tweet }) {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const noFeature = () =>
    dispatch(setInfoNotice({ message: "Feature not implemented!" }));

  const [likedByMe, setLikedByMe] = useState(tweet.liked ?? false);
  const [likeCount, setLikeCount] = useState(tweet.likeCount ?? 0);

  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
  } = tweet.owner;

  const handleLikeClick = async () => {
    if (!isAuthenticated)
      return dispatch(
        setInfoNotice({ message: "Login/Sign Up to Like a Tweet Reply" })
      );
    setLikedByMe(!likedByMe);
    const res = await http.patch(`/tweet/${tweet?.id}/like`);
    setLikeCount(res.data?.likes ?? 0);
  };

  return (
    <div className="flex items-start px-4 py-2 hover:bg-[#00000008] cursor-pointer border-t border-slate-200">
      <div className="flex mr-3">
        <ProfileHoverCard
          profile={profile}
          alt={name}
          name={name}
          username={username}
          following={following}
          followers={followers}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-1">
          <div className="flex flex-1 gap-x-1 text-sm">
            <span className="text-slate-900 font-bold">{name}</span>
            <span className="text-slate-600 font-medium">@{username}</span>·
            <span className="text-slate-600 font-medium">
              {timeAgo(tweet?.createdAt)}
            </span>
          </div>
          <div className="flex">
            <TweetDropdownMenu
              username={username}
              tweetID={tweet?.id}
              tweetByOwner={username === user?.username}
              isReply={true}
            />
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Replying to <span className="text-blue-500">@{username}</span>
        </div>
        <div className="text-sm text-slate-900">{tweet?.content}</div>

        {/* attachments */}
        {tweet?.attachments.length > 0 && (
          <div className="w-full relative -z-10 h-80 my-2">
            {tweet?.attachments.map((item, i) => (
              <Image
                key={`attachment-${i}-${item?.id}`}
                fill={true}
                style={{ objectFit: "cover" }}
                className="rounded-3xl"
                src={relativeCDNUrl(item?.path)}
                alt="Tweet attachment"
              />
            ))}
          </div>
        )}

        <div className="flex gap-x-14 mt-2 py-1 font-semibold text-slate-500 text-xs">
          <div
            className="flex items-center gap-x-2 hover:text-[#1d9bf0] cursor-pointer"
            onClick={noFeature}
          >
            <div className="relative">
              <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
              <HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
            </div>
            <span>0</span>
          </div>
          <div
            className="flex gap-x-2 hover:text-[#1d9bf0] cursor-pointer"
            onClick={noFeature}
          >
            <div className="relative">
              <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
              <HiOutlineArrowPath className="w-5 h-5" />
            </div>
            <span>0</span>
          </div>
          <div
            className="flex gap-x-2 hover:text-[#f91880] cursor-pointer"
            onClick={handleLikeClick}
          >
            <div className="relative">
              <div className="absolute rounded-full m-[-8px] hover:bg-[#f9188033] top-0 bottom-0 left-0 right-0"></div>
              {likedByMe ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5" />
              )}
            </div>
            <span>{likeCount}</span>
          </div>
          <div
            className="flex gap-x-2 hover:text-[#1d9bf0] cursor-pointer"
            onClick={noFeature}
          >
            <div className="relative">
              <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
              <HiArrowUpTray className="w-5 h-5" />
            </div>
            {0}
          </div>
        </div>
      </div>
    </div>
  );
}
