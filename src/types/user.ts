export interface Count {
  following: number;
  followers: number;
}
export interface BlueAccountType {
  isVerified: boolean;
  type: AccountType;
}

export interface User {
  name: string;
  createdAt: Date;
  username: string;
  bio: string;
  count: Count;
  location: string;
  url: string;
  profile: string;
  profileCover: string;
  id: string;
  account: BlueAccountType;
  following: boolean;
  follows: boolean;
}

export type SessionUser = User & {
  email: string;
  role: string;
  tweetLimit: number;
  updatedAt: Date;
  subscription: AccountSubscription;
};

export type AccountType = "Person" | "Business" | "Government";
export interface AccountSubscription {
  type: AccountType;
  validTill?: number;
  verified: boolean;
  legacy?: boolean;
}
