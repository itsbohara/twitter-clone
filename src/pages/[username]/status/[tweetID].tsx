import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "@/client/axios";
import Head from "next/head";
import Nav from "@ui/Nav";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Loader from "@ui/Loader";
import ProfileHoverCard from "@ui/radix/ProfileHoverCard";
import useAuth from "../../../hooks/useAuth";
import { Text } from "@ui/Text";
import { timeAgo } from "../../../utils/date";
import PageNotFound from "../../../components/NotFound";
import {
  HiArrowUpTray,
  HiHeart,
  HiOutlineArrowPath,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import { setInfoNotice } from "@/redux/slices/notice";
import { useAppDispatch } from "../../../hooks/useApp";
import TweetDropdownMenu from "@ui/radix/DropdownMenu";
import Image from "next/image";
import TweetReplyForm from "@/sections/tweet/TweetReplyForm";
export default function TweetPage() {
  const dispatch = useAppDispatch();
  const { pathname, query, back } = useRouter();
  const { tweetID, username } = query;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [tweet, setTweet] = useState<any>({});

  // tweet meta

  const [likedByMe, setLikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await http.get(`/tweet/${tweetID}`);
        setTweet(res.data);
      } catch (e) {
        setNotFound(true);
      }
      setLoading(false);
    };
    fetchTweet();
  }, []);

  useEffect(() => {
    if (!tweet) return;
    setLikeCount(tweet?.likeCount);
    setLikedByMe(tweet?.liked ?? false);
  }, [tweet]);

  const handleBackClick = () => back();

  const handleLikeClick = async () => {
    setLikedByMe(!likedByMe);
    const res = await http.patch(`/tweet/${tweet?.id}/like`);
    setLikeCount(res.data?.likes ?? 0);
  };

  const noFeature = () =>
    dispatch(setInfoNotice({ message: "Feature not implemented!" }));

  return (
    <>
      <Head>
        <title>
          {notFound ? "Tweet" : `${username} on Twitter `} | Twitter Clone
        </title>
      </Head>

      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />
        <main className="col-span-5 border-x border-slate-200 flex-1 w-full flex-col">
          <div className="sticky bg-white/75 z-10 backdrop-blur-md top-0">
            <div className="flex items-center px-4 py-3 gap-x-2">
              <div className="pr-3 py-1 mx-1">
                <div
                  className="text-2xl font-medium rounded-full hover:text-blue-300 cursor-pointer"
                  onClick={handleBackClick}
                >
                  <IoMdArrowBack />
                </div>
              </div>
              <h2 className="text-lg font-bold">Tweet</h2>
            </div>
          </div>
          {loading && <Loader />}
          {!loading && !notFound && (
            <>
              <div className="flex flex-col p-4">
                <TweetOwner owner={tweet?.owner} />
                <div className="my-3">
                  <span className="text-2xl fodnt-bold">{tweet?.content}</span>
                  {/* attachment */}
                  {tweet?.attachments?.length > 0 && (
                    <div className="w-full relative -z-10 h-80 mb-4 my-2">
                      {tweet?.attachments.map((item, i) => (
                        <Image
                          key={`attachment-${i}-${item?.id}`}
                          fill={true}
                          style={{ objectFit: "cover" }}
                          className="rounded-3xl"
                          src={`http://localhost:9425${item?.url ?? ""}`}
                          // src={`${item?.url}`}
                          alt="Tweet attachment"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-x-1 text-slate-500 text-sm">
                  <time className="">{timeAgo(tweet?.createdAt)}</time>
                  <div>
                    .
                    <span className="text-black font-semibold mx-1">
                      {tweet?.viewCount}
                    </span>
                    Views
                  </div>
                </div>
                <div className="flex gap-x-4 mt-2 py-3 font-semibold text-sm border-y border-slate-200">
                  <div className="flex gap-x-[2px]">
                    {tweet?.replyCount}
                    <span className="font-normal text-slate-500">Retweets</span>
                  </div>
                  <div className="flex gap-x-[2px]">
                    {tweet?.retweetCount}
                    <span className="font-normal text-slate-500">
                      Quote Retweets
                    </span>
                  </div>
                  <div className="flex gap-x-[2px]">
                    {likeCount}
                    <span className="font-normal text-slate-500">Likes</span>
                  </div>
                </div>
                <div className="flex justify-around py-3 font-semibold text-slate-500 text-sm border-b border-slate-200">
                  <div
                    className=" hover:text-[#1d9bf0] cursor-pointer"
                    onClick={noFeature}
                  >
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
                      <HiOutlineChatBubbleOvalLeft className="w-6 h-6" />
                    </div>
                  </div>
                  <div
                    className=" hover:text-[#1d9bf0] cursor-pointer"
                    onClick={noFeature}
                  >
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
                      <HiOutlineArrowPath className="w-6 h-6" />
                    </div>
                  </div>
                  <div
                    className=" hover:text-[#f91880] cursor-pointer"
                    onClick={handleLikeClick}
                  >
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#f9188033] top-0 bottom-0 left-0 right-0"></div>
                      {likedByMe ? (
                        <HiHeart className="w-6 h-6 text-red-500" />
                      ) : (
                        <HiOutlineHeart className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <div
                    className=" hover:text-[#1d9bf0] cursor-pointer"
                    onClick={noFeature}
                  >
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
                      <HiArrowUpTray className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="replay-form px-4 pb-2">
                <TweetReplyForm width="full" />
              </div>
              <div className="flex flex-col">
                <TweetReply owner={tweet?.owner} />
                <TweetReply owner={tweet?.owner} />
                <TweetReply owner={tweet?.owner} />
                <TweetReply owner={tweet?.owner} />
              </div>
            </>
          )}
          {notFound && <PageNotFound />}
        </main>
      </div>
    </>
  );
}

function TweetOwner({ owner }) {
  const { user } = useAuth();
  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
  } = owner;

  return (
    <div className="flex items-center">
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
        <p className="text-base font-semibold truncate">{user?.name}</p>
        <p className="text-sm text-slate-600 font-medium">@{user?.username}</p>
      </div>
      <div className="flex">
        <TweetDropdownMenu
          username={username}
          tweetID={"id"}
          tweetByMe={true}
        />
      </div>
    </div>
  );
}

function TweetReply({ owner }) {
  const dispatch = useAppDispatch();
  const noFeature = () =>
    dispatch(setInfoNotice({ message: "Feature not implemented!" }));

  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
  } = owner;

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
              Time
              {/* {timeAgo(date)} */}
            </span>
          </div>
          <div className="flex">
            <TweetDropdownMenu
              username={username}
              tweetID={"id"}
              tweetByMe={true}
            />
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Replying to <span className="text-blue-500">@mahi</span>
        </div>
        <div className="text-sm text-slate-900">contet ehreer </div>

        {/* attachments */}
        <div className="w-full relative -z-10 h-80 my-2">
          <Image
            key={`attachment`}
            fill={true}
            style={{ objectFit: "cover" }}
            className="rounded-3xl"
            src={`https://images.unsplash.com/photo-1674718320543-a7c80472059b`}
            alt="Tweet attachment"
          />
        </div>

        <div className="flex justify-around mt-2 py-1 font-semibold text-slate-500 text-xs">
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
            onClick={noFeature}
          >
            <div className="relative">
              <div className="absolute rounded-full m-[-8px] hover:bg-[#f9188033] top-0 bottom-0 left-0 right-0"></div>

              <HiOutlineHeart className="w-5 h-5" />
            </div>
            <span>0</span>
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
