import Image from "next/image";
import Post from "@ui/Post";
import { ReactNode, useEffect, useState } from "react";
import { Suspense } from "react";
import { useAppDispatch } from "@hook/useApp";
import { useAppSelector } from "@hook/useApp";
import { getTweets } from "@redux/slices/tweet.slice";
import { getNameInitials } from "@util/string";
import { getProfileTweets } from "@redux/slices/profile.slice";
import Loader from "./Loading";
import { Error } from "./Error";

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
  const { tweets, error } = useAppSelector((state) => state.tweet);
  //
  useEffect(() => {
    const fetchTweets = async () => {
      await dispatch(getTweets());
      setLoading(false);
    };
    fetchTweets();
  }, []);

  if (loading) return <Loader />;


  if (error) return <Error message={error} />

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
          liked,
          type,
          parentTweet,
        } = tweets.byId[tweetID];

        return (
          <li key={`tweet-${id}`}>
            <Post
              key={`tweet-${id}`}
              id={id}
              content={content}
              attachments={attachments}
              date={date}
              user={owner}
              likes={likes}
              liked={liked ?? false}
              views={views}
              retweetCount={retweetCount}
              replyCount={replyCount}
              tweetType={type}
              parentTweet={parentTweet}
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
