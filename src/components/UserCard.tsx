import TwitterBlueCheck from "./TwitterBlueCheck";
import { User } from "../types/user";
import Link from "next/link";
const UserCard = ({ user }: { user: User & { follows?: boolean } }) => {
  const {
    name,
    username,
    bio,
    account,
    count: { followers, following },
    follows,
  } = user;
  const bioAvailable = bio && bio?.trim() !== "";
  return (
    <>
      <div className="my-2">
        <Link
          href={`/${username}`}
          className="flex items-center text-base font-semibold leading-none hover:underline"
        >
          <span>{name}</span>
          <TwitterBlueCheck account={account} />
        </Link>
        <div className="text-sm text-slate-500 font-medium">
          <span>@{username}</span>
          {follows && (
            <span className="ml-1 rounded bg-slate-200 px-1 py-0.25 text-xs">
              Follows you
            </span>
          )}
        </div>
      </div>
      {bioAvailable && <div className="text-sm mb-2">{bio}</div>}
      <div className="flex gap-x-4">
        <div className="flex gap-x-1">
          <div className="text-sm font-bold leading-none">{following ?? 0}</div>
          <div className="text-sm text-slate-500 leading-none">Following</div>
        </div>
        <div className="flex gap-x-1">
          <div className="text-sm font-bold leading-none">{followers ?? 0}</div>
          <div className="text-sm text-slate-500 leading-none">Followers</div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
