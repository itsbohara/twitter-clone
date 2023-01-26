import Image from "next/image";
import Post from "@ui/Post";
import { ReactNode, useEffect, useState } from "react";
import { Suspense } from "react";
import { useAppDispatch } from "@/hooks/useApp";
import { useAppSelector } from "../hooks/useApp";
import { getTweets } from "../redux/slices/tweet.slice";
import { getNameInitials } from "../utils/string";
import { getProfileTweets } from "../redux/slices/profile.slice";

interface PostItem {
  name: string;
  username: string;
  content: string;
  description: string;
  date: string;
  src: string;
  following: string;
  followers: string;
  initials: string;
  image?: ReactNode;
}

const Feed = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { tweets } = useAppSelector((state) => state.tweet);
  // const { tweets } = useAppSelector((state) => state.profile);
  //
  useEffect(() => {
    const fetchTweets = async () => {
      // await dispatch(getProfileTweets("mahi"));
      await dispatch(getTweets());
      setLoading(false);
    };
    fetchTweets();
  }, []);

  if (loading) return <Loading />;

  return (
    <ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
      {tweets.allIds.map((tweetID, i) => {
        const {
          id,
          content,
          attachments,
          owner,
          createdAt: date,
          viewCount: views,
          likeCount: likes,
          replyCount,
          retweetCount,
        } = tweets.byId[tweetID];

        return (
          <li key={`tweet-${id}`} className="p-4">
            <Post
              key={`tweet-${id}`}
              id={id}
              content={content}
              attachments={attachments}
              date={date}
              user={owner}
              likes={likes}
              views={views}
              retweetCount={retweetCount}
              replyCount={replyCount}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Feed;

function Loading() {
  return <h2>Loading...</h2>;
}
