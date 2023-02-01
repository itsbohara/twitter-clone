export type AccountType = "Person" | "Business" | "Government";
export type AccountSubscription = {
  type: AccountType;
  validTill?: number;
  verified: boolean;
  legacy?: boolean;
};
