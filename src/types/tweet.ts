import { BlueAccountType, Count } from "./user";
export interface TweetUser {
  id: string;
  name: string;
  createdAt: Date;
  username: string;
  bio: string;
  count: Count;
  location: string;
  url: string;
  profile: string;
  profileCover: string;
  account: BlueAccountType;
}

export interface Account2 {
  isVerified: boolean;
  type: string;
}

export interface TweetCount {
  likes: number;
  views: number;
  retweets: number;
  replies: number;
}

export interface Tweet {
  attachments: any[];
  type: TweetType;
  owner: TweetUser;
  likeCount: number;
  viewCount: number;
  retweetCount: number;
  replyCount: number;
  isReply: boolean;
  parentTweet: Tweet;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  content: string;
  count: TweetCount;
  liked: boolean;
}

type TweetType = "RETWEET" | "QUOTE_RETWEET" | "NORMAL" | "IMAGE" | "POLL"; // Not Implemented
