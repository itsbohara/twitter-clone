import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "@/client/axios";
import { getProfileTweets } from "../../redux/slices/profile.slice";
import Post from "@ui/Post";
import useAuth from "@/hooks/useAuth";
import Loading from "@ui/Loading";

export default function UserLikedTweets() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { likes: tweets } = useAppSelector((state) => state.profile);
  const {
    query: { username },
  } = useRouter();

  useEffect(() => {
    const getLikedTweets = async () => {
      dispatch(getProfileTweets(username, { liked: true }));
      setLoading(false);
    };
    getLikedTweets();
    return () => setLoading(true);
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
          liked,
        } = tweets.byId[tweetID];

        return (
          <li key={`tweet-${id}`}>
            <Post
              id={id}
              user={owner}
              content={content}
              attachments={attachments}
              date={date}
              liked={(username === user?.username || liked) ?? false}
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
}
