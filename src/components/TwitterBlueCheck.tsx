import React from "react";
import TwitterBusinessBadge from "./badges/TwitterBusiness";
import TwitterBlueBadge from "./badges/TwitterBlue";
import cx from "classnames";
import TwitterGovernmentBadge from "./badges/TwitterGovernment";
import { AccountSubscription } from "../types/user";

export default function TwitterBlueCheck({
  subscription,
  className,
}: {
  subscription?: AccountSubscription;
  className?;
}) {
  if (!subscription || !subscription.verified) {
    return <></>;
  }
  return (
    <span>
      {subscription.type == "Business" && (
        <TwitterBusinessBadge
          className={cx("mx-1 h-[20px] w-[20px]", className)}
        />
      )}
      {subscription.type == "Person" && (
        <TwitterBlueBadge className={cx("mx-1 h-[20px] w-[20px]", className)} />
      )}
      {subscription.type == "Government" && (
        <TwitterGovernmentBadge
          className={cx("mx-1 h-[20px] w-[20px]", className)}
        />
      )}
    </span>
  );
}
