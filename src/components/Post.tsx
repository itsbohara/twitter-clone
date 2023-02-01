import { ReactNode, useEffect, useState } from "react";
import TweetDropdownMenu from "@rd/DropdownMenu";
import ProfileHoverCard from "@rd/ProfileHoverCard";
import useAuth from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useApp";
import { toggleTweetLike, updateTweet } from "../redux/slices/tweet.slice";

import {
  HiOutlineHeart,
  HiHeart,
  HiArrowUpTray,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";
import axios from "@/client/axios";
import useOnScreen from "@/hooks/useOnScreen";
import { RiBarChartLine } from "react-icons/ri";
import Image from "next/image";
import { timeAgo } from "../utils/date";
import { useRouter } from "next/router";
import { relativeCDNUrl } from "@/utils/url";
import { setInfoNotice } from "@/redux/slices/notice";

interface PostOwner {
  name: string;
  username: string;
  profile: string;
  count: {
    followers: string;
    following: string;
  };
  bio: string;
}

interface Props {
  id: string;
  content: string;
  attachments?: any[];
  date: string;
  user: PostOwner;
  children?: ReactNode;
  [key: string]: any;
}

const Post = ({
  id,
  content,
  attachments = [],
  date,
  user,
  children,
  ...props
}: Props) => {
  const router = useRouter();
  const [postVisible, postRef] = useOnScreen();
  const { user: CurrentUser, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [likedByMe, setLikedByMe] = useState(props.liked ?? false);
  const [likeCount, setLikeCount] = useState(props.likes ?? 0);

  const handleLikeClick = async () => {
    if (!isAuthenticated)
      return dispatch(
        setInfoNotice({ message: "Login/Sign Up to Like a Tweet" })
      );
    // var a = await dispatch(toggleTweetLike(id));
    setLikedByMe(!likedByMe);
    const res = await axios.patch(`/tweet/${id}/like`);
    setLikeCount(res.data?.likes ?? 0);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    // tweet view count by seen time
    if (postVisible && id) {
      dispatch(
        updateTweet(
          id,
          { viewCount: (props?.views ?? 0) + 1 },
          { silent: true }
        )
      );
    }
  }, [postVisible]);

  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
  } = user;

  const openTweetPage = () => router.push(`/${username}/status/${id}`);

  return (
    <div
      className="p-4 hover:bg-[#00000008] cursor-pointer"
      onClick={openTweetPage}
    >
      <div className="flex flex-1 gap-x-4" ref={postRef}>
        <div className="flex-shrink-0">
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
              <span className="flex text-slate-900 font-bold truncate">
                {name}
                <TwitterBlueCheck
                  subscription={subscription}
                  className="!mr-0 !h-[18px] !w-[18px]"
                />
              </span>
              <span className="text-slate-600 font-medium truncate">
                @{username}
              </span>
              ·
              <span className="text-slate-600 font-medium">
                {timeAgo(date)}
              </span>
            </div>
            <div className="">
              <TweetDropdownMenu
                username={username}
                tweetID={id}
                tweetByOwner={CurrentUser?.username === username}
              />
            </div>
          </div>
          <div className="text-sm text-slate-900">{content}</div>
          {attachments.length > 0 && (
            <div className="w-full relative -z-10 h-80 my-2">
              {attachments.map((item, i) => (
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
          <div>
            <ul className="flex items-stretch mt-4 gap-x-10 xl:gap-x-14 text-xs text-slate-700 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 ">
              <li>
                {/* <HiOutlineChartBarSquare className="w-5 h-5" /> */}
                <RiBarChartLine className="w-5 h-5" />
                {props?.views ?? 0}
              </li>
              <li>
                <div className=" hover:text-[#1d9bf0] cursor-pointer">
                  <div className="relative">
                    <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>

                    <HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
                  </div>
                </div>
                {props?.replyCount ?? 0}
              </li>
              <li>
                <HiOutlineArrowPath className="w-5 h-5" />
                {props?.retweetCount ?? 0}
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick();
                }}
                className="hover:text-[#f91880] cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute rounded-full m-[-8px] hover:bg-[#f9188033] top-0 bottom-0 left-0 right-0"></div>
                  {likedByMe ? (
                    <HiHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <HiOutlineHeart className="w-5 h-5" />
                  )}
                </div>
                {likeCount}
              </li>

              <li>
                <HiArrowUpTray className="w-5 h-5" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
