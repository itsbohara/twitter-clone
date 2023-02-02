export interface Count {
  following: number;
  followers: number;
}

export interface User {
  name: string;
  email: string;
  role: string;
  tweetLimit: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  bio: string;
  count: Count;
  location: string;
  url: string;
  profile: string;
  subscription: AccountSubscription;
  profileCover: string;
  id: string;
}

export type AccountType = "Person" | "Business" | "Government";
export interface AccountSubscription {
  type: AccountType;
  validTill?: number;
  verified: boolean;
  legacy?: boolean;
}
