import { ReactNode, useEffect, useState } from "react";
import TweetDropdownMenu from "@ui/popovers/DropdownMenu";
import ProfileHoverCard from "@ui/popovers/ProfileHoverCard";
import useAuth from "@hook/useAuth";
import { useAppDispatch } from "@hook/useApp";
import { toggleTweetLike, updateTweet } from "@redux/slices/tweet.slice";

import {
  HiOutlineHeart,
  HiHeart,
  HiArrowUpTray,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineArrowPath,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";
import axios from "@/client/axios";
import useOnScreen from "@hook/useOnScreen";
import { RiBarChartLine } from "react-icons/ri";
import Image from "next/image";
import { timeAgo } from "@util/date";
import { useRouter } from "next/router";
import { relativeCDNUrl } from "@util/url";
import { setInfoNotice } from "@redux/slices/notice";
// import ReTweetDropdownMenu from "@sections/tweet/ReTweetMenu";
import { AccountSubscription, User } from "../types/user";
import TwitterBlueCheck from "./TwitterBlueCheck";
import Link from "next/link";
import ImagePreview from "@sections/tweet/ImagePreview";

interface Props {
  id: string;
  content: string;
  attachments?: any[];
  date: string;
  user: User;
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
  const isRetweet = props?.tweetType === "RETWEET";
  const tweetProps = isRetweet ? props?.parentTweet : props;

  const [postVisible, postRef] = useOnScreen();
  const { user: CurrentUser, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [likedByMe, setLikedByMe] = useState(tweetProps.liked ?? false);
  const [likeCount, setLikeCount] = useState(tweetProps.likes ?? 0);

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
      console.log("isRetweet ?? ", isRetweet);

      // dispatch(
      //   updateTweet(
      //     isRetweet ? props?.parentTweet?.id : id,
      //     { viewCount: (tweetProps?.views ?? 0) + 1 },
      //     { silent: true }
      //   )
      // );
    }
  }, [postVisible]);

  const noFeature = (e) => {
    e.stopPropagation();
    dispatch(setInfoNotice({ message: "Not available!" }));
  };

  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
    account,
  } = user;

  const openTweetPage = () => router.push(`/${username}/status/${id}`);

  return (
    <div
      className="p-4 hover:bg-[#00000008] cursor-pointer"
      onClick={openTweetPage}
    >
      <div className="flex flex-1 gap-x-4" ref={postRef}>
        <div className="flex-shrink-0">
          <ProfileHoverCard user={user} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            <div className="flex flex-1 gap-x-1 text-sm">
              <Link
                href={`/${username}`}
                className="flex hover:underline text-slate-900 font-bold truncate"
              >
                {name}
                <TwitterBlueCheck
                  account={account}
                  className="!mr-0 !h-[18px] !w-[18px]"
                />
              </Link>
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
            <div className="w-full relative -z-10 my-2">
              <ImagePreview images={attachments} />
            </div>
          )}
          <div>
            <ul className="flex items-stretch mt-4 gap-x-10 xl:gap-x-14 text-xs text-slate-700 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 ">
              <li>
                {/* <HiOutlineChartBarSquare className="w-5 h-5" /> */}
                <RiBarChartLine className="w-5 h-5" />
                {tweetProps?.views ?? 0}
              </li>
              <li>
                <div className=" hover:text-[#1d9bf0] cursor-pointer">
                  <div className="relative">
                    <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>

                    <HiOutlineChatBubbleOvalLeft className="w-5 h-5" />
                  </div>
                </div>
                {tweetProps?.replyCount ?? 0}
              </li>
              <li>
                {/* <ReTweetDropdownMenu
                  tweetID={id}
                  count={tweetProps?.retweetCount ?? 0}
                /> */}
                <HiOutlineArrowPath className="w-5 h-5" />
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
                <div
                  role="button"
                  onClick={noFeature}
                  className=" hover:text-[#1d9bf0] cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>

                    <HiArrowUpTray className="w-5 h-5" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
