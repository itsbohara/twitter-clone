import Post from "@ui/Post";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@hook/useApp";
import { useAppSelector } from "@hook/useApp";
import { getTweets } from "@redux/slices/tweet.slice";
import Loader from "./Loading";
import { Error } from "./Error";
import { AnimatePresence } from "framer-motion";


const Feed = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { tweets, error } = useAppSelector((state) => state.tweet);
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
      <AnimatePresence mode='popLayout'>
        {tweets.allIds.map((tweetID, i) => {
          const tweet = tweets.byId[tweetID];

          return (
            <li key={`tweet-${tweet?.id}`}>
              <Post tweet={tweet} />
            </li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};

export default Feed;