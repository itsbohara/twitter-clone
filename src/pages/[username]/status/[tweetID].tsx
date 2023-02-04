import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "@/client/axios";
import Head from "next/head";
import Nav from "@ui/Nav";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import Loader from "@ui/Loading";
import ProfileHoverCard from "@ui/popovers/ProfileHoverCard";
import useAuth from "@hook/useAuth";
import { Text } from "@ui/Text";
import { timeAgo } from "@util/date";
import PageNotFound from "@ui/NotFound";
import {
  HiArrowUpTray,
  HiHeart,
  HiOutlineArrowPath,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";

// todo : redux import - renaming - - right now after bhaat lagayaign 🤣🤣🤣🤣🤣
import { setInfoNotice } from "@redux/slices/notice";
import { useAppDispatch, useAppSelector } from "@hook/useApp";
import TweetDropdownMenu from "@ui/popovers/DropdownMenu";
import Image from "next/image";
import TweetReplyForm from "@sections/tweet/TweetReplyForm";
import { getTweetReplies } from "@redux/slices/tweet.slice";
import TweetReply from "@sections/tweet/TweetReply";
import AppLoading from "@ui/AppLoading";
import TwitterBlueCheck from "@ui/TwitterBlueCheck";
import ImagePreview from "@sections/tweet/ImagePreview";
export default function TweetPage({ data, resType }) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, query, back } = useRouter();
  const { tweetID, username } = query;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(resType === "NOT_FOUND");
  const [tweet, setTweet] = useState<any>(null);

  // tweet meta

  const [likedByMe, setLikedByMe] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { tweetReplies: replies } = useAppSelector((state) => state.tweet);
  const [replyLoading, setReplyLoading] = useState(true);

  const [tweetReplyFocus, setTweetReplyFocus] = useState(false);

  useEffect(() => {
    if (!tweetID) return; // first load UI fix
    // do not fetch again if data is already fetched at server side
    if (resType === "SUCCESS" || resType === "NOT_FOUND") {
      setLoading(false);
      resType === "SUCCESS" && setTweet(data);
      resType === "NOT_FOUND" && setNotFound(true);
      return;
    }
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
  }, [tweetID]);

  useEffect(() => {
    if (!tweet) return;

    setLikeCount(tweet?.likeCount);
    setLikedByMe(tweet?.liked ?? false);
    const fetchReplies = async () => {
      await dispatch(getTweetReplies(tweet.id));
      setReplyLoading(false);
    };
    fetchReplies();
  }, [tweet]);

  const handleBackClick = () => back();

  const handleLikeClick = async () => {
    if (!isAuthenticated)
      return dispatch(
        setInfoNotice({ message: "Login/Sign Up to Like a Tweet" })
      );

    setLikedByMe(!likedByMe);
    const res = await http.patch(`/tweet/${tweet?.id}/like`);
    setLikeCount(res.data?.likes ?? 0);
  };

  const noFeature = () =>
    dispatch(setInfoNotice({ message: "Feature not implemented!" }));

  const title = notFound ? "Tweet" : `${data?.owner?.username} on Twitter`;
  return (
    <>
      <Head>
        <title>{`${title} | Twitter Clone`}</title>
        {!notFound && (
          <meta
            name="description"
            content={`${data?.owner?.username}'s Tweet : ${data?.content}`}
          />
        )}
      </Head>

      {!isInitialized && <AppLoading />}
      {isInitialized && (
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
                  <TweetOwner owner={tweet?.owner} tweetID={tweet?.id} />
                  <div className="my-3">
                    <span className="text-2xl fodnt-bold">
                      {tweet?.content}
                    </span>
                    {/* attachment */}
                    {tweet?.attachments?.length > 0 && (
                      <div className="h-full relative mb-4 my-2">
                        <ImagePreview
                          images={tweet?.attachments}
                          isSingleTweet
                        />
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
                      {/* <span className="font-normal text-slate-500">Retweets</span> */}
                      <span className="font-normal text-slate-500">
                        Replies
                      </span>
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
                      onClick={() => setTweetReplyFocus(true)}
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

                {replyLoading && <Loader />}
                {!replyLoading && (
                  <>
                    {isAuthenticated && (
                      <div className="replay-form px-4 pb-2 relative">
                        <TweetReplyForm
                          tweetID={tweet?.id}
                          width="full"
                          inputFocus={tweetReplyFocus}
                          onInputBlur={() => setTweetReplyFocus(false)}
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      {replies?.allIds.map((tweetID) => (
                        <TweetReply
                          key={tweetID}
                          tweet={replies.byId[tweetID]}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            {notFound && <PageNotFound />}
          </main>
        </div>
      )}
    </>
  );
}

function TweetOwner({ owner, tweetID }) {
  const { user } = useAuth();
  const {
    name,
    username,
    profile,
    bio,
    count: { followers, following },
  } = owner;

  const { back } = useRouter();

  const onTweetDeleted = () => back();

  return (
    <div className="flex items-center">
      <div className="flex mr-3">
        <ProfileHoverCard user={owner} />
      </div>
      <div className="flex flex-col flex-1">
        <p className="flex items-center text-base font-semibold truncate">
          <span>{name}</span>
          <TwitterBlueCheck
            account={owner?.account}
            className="!mr-0 !h-[18px] !w-[18px]"
          />
        </p>
        <p className="text-sm text-slate-600 font-medium">@{username}</p>
      </div>
      <div className="flex">
        <TweetDropdownMenu
          username={username}
          tweetID={tweetID}
          tweetByOwner={user?.username === username}
          postDeleteFunc={onTweetDeleted}
        />
      </div>
    </div>
  );
}

// pre-render at build time
// export async function getStaticProps({ params }) {
//   return {
//     props: {  }, // will be passed to the page component as props
//   };
// }

// // This gets called on every request
export async function getServerSideProps({ req, res, params }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let resType = "SUCCESS";
  let data = null;
  // Fetch tweet data from API
  const { tweetID } = params;
  try {
    const tweetRes = await http.get(`/tweet/${tweetID}`);
    data = tweetRes.data;
  } catch (error) {
    resType = "NOT_FOUND";
  }

  // Pass data to the page via props
  return { props: { data, resType } };
}
