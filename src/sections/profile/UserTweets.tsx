import Image from "next/image";
import Post from "@ui/Post";
import { ReactNode, useState, useEffect } from "react";
import { Suspense } from "react";
import axios from "@/client/axios";
import { getNameInitials } from "../../utils/string";

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
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const getTweets = async () => {
      const response = await axios.get(`/tweets/u/${username}`);
      setTweets(response.data);
      setLoading(false);
    };
    getTweets();
  }, [username]);
  if (loading) return <Loading />;
  return (
    <Suspense fallback={<Loading />}>
      <ul className="[&_p:last-child]:text-slate-500 [&_p:first-child]:text-lg divide-y divide-slate-200">
        {tweets.map(
          (
            {
              owner: {
                name,
                username,
                count: { following, followers },
                profile,
              },
              id,
              content,
              createdAt: date,
              image,
              description,
              viewCount: views,
              likeCount: likes,
              replyCount,
              retweetCount,
            },
            i
          ) => (
            <li
              key={`tweet-${i}`}
              className="p-4 hover:bg-[#00000008] cursor-pointer"
            >
              <Post
                id={id}
                name={name}
                username={username}
                content={content}
                date={date}
                src={profile}
                initials={getNameInitials(name)}
                description={description}
                followers={followers}
                following={following}
                likes={likes}
                views={views}
                retweetCount={retweetCount}
                replyCount={replyCount}
              >
                {image}
              </Post>
            </li>
          )
        )}
      </ul>
    </Suspense>
  );
};

export default UserTweets;

function Loading() {
  return <h2>Loading...</h2>;
}
