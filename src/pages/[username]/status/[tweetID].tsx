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
export default function TweetPage() {
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
  }, [tweet]);

  const handleBackClick = () => back();

  const handleLikeClick = async () => {
    setLikedByMe(!likedByMe);
    const res = await http.patch(`/tweet/${tweet?.id}/like`);
    setLikeCount(res.data?.likes ?? 0);
  };

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
                <div className="flex justify-around mt-2 py-3 font-semibold text-slate-500 text-sm border-b border-slate-200">
                  <div className=" hover:text-[#1d9bf0] cursor-pointer">
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
                      <HiOutlineChatBubbleOvalLeft className="w-6 h-6" />
                    </div>
                  </div>
                  <div className=" hover:text-[#1d9bf0] cursor-pointer">
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
                        <HiHeart className="w-6 h-6" />
                      ) : (
                        <HiOutlineHeart className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <div className=" hover:text-[#1d9bf0] cursor-pointer">
                    <div className="relative">
                      <div className="absolute rounded-full m-[-8px] hover:bg-[#18a6f920] top-0 bottom-0 left-0 right-0"></div>
                      <HiArrowUpTray className="w-6 h-6" />
                    </div>
                  </div>
                </div>
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
      <div>More Btn</div>
    </div>
  );
}