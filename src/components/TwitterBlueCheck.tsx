import React from "react";
import TwitterBusinessBadge from "./badges/TwitterBusiness";
import TwitterBlueBadge from "./badges/TwitterBlue";
import cx from "classnames";
import TwitterGovernmentBadge from "./badges/TwitterGovernment";
import { BlueAccountType } from "../types/user";

export default function TwitterBlueCheck({
  account,
  className,
}: {
  account?: BlueAccountType;
  className?;
}) {
  if (!account || !account.isVerified) {
    return <></>;
  }
  return (
    <span>
      {account.type == "Business" && (
        <TwitterBusinessBadge
          className={cx("mx-1 h-[20px] w-[20px]", className)}
        />
      )}
      {account.type == "Person" && (
        <TwitterBlueBadge className={cx("mx-1 h-[20px] w-[20px]", className)} />
      )}
      {account.type == "Government" && (
        <TwitterGovernmentBadge
          className={cx("mx-1 h-[20px] w-[20px]", className)}
        />
      )}
    </span>
  );
}
