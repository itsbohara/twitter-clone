import Image from "next/image";
import Post from "@ui/Post";
import { ReactNode, useState, useEffect } from "react";
import { Suspense } from "react";
import axios from "@/client/axios";
import { getNameInitials } from "../../utils/string";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { getProfileTweets } from "@/redux/slices/profile.slice";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";

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

const items = [
  {
    name: "Jane Doe",
    username: "janedoe",
    src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
    initials: "JD",
    image: (
      <div className="w-full relative -z-10 h-80 mb-4">
        <Image
          fill={true}
          style={{ objectFit: "cover" }}
          className="rounded-3xl"
          src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
          alt="Gradient"
        />
      </div>
    ),
  },
];

const UserTweets = ({ username }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { tweets } = useAppSelector((state) => state.profile);
  useEffect(() => {
    const getTweets = async () => {
      dispatch(getProfileTweets(username));
      setLoading(false);
    };
    getTweets();
    return () => setLoading(true);
  }, [username]);
  if (loading) return <Loader />;

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
              liked={liked ?? false}
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

export default UserTweets;
