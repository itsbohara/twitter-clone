import { useAppDispatch, useAppSelector } from "@hook/useApp";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import http from "@/client/axios";
import { getProfileTweets } from "@redux/slices/profile.slice";
import Post from "@ui/Post";
import useAuth from "@hook/useAuth";
import { useModalAction } from "@ctx/ModalContext";
import Loading from "@ui/Loading";
import EmptyTweet from "@ui/EmptyTweet";

export default function UserLikedTweets() {
  const { openModal } = useModalAction()
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { likes: tweets } = useAppSelector((state) => state.profile);

  const {
    query: { username },
  } = useRouter();

  useEffect(() => {
    if (!user) {
      openModal('AUTH_BOARDING')
      return;
    }
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
      {tweets.allIds.length === 0 &&
        <EmptyTweet title={`@${username} hasn't liked any Tweets`}
          desc="When they do, those Tweets will show up here."
        />
      }
      {tweets.allIds.map((tweetID, i) => {
        const tweet = tweets.byId[tweetID];
        return (
          <li key={`tweet-${tweet?.id}`}>
            <Post tweet={{ ...tweet, liked: true }} />
          </li>
        );
      })}
    </ul>
  );
}
