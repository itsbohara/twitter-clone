import Link from "next/link";
import { BiCalendar, BiLinkAlt } from "react-icons/bi";

const ProfileUserInfo = ({
  name,
  username,
  description,
  following,
  followers,
  joinedDate,
}: {
  name: string;
  username: string;
  description: string;
  following: string;
  followers: string;
  joinedDate: string;
}) => {
  const _joined = new Date(joinedDate);
  const joinedMonth = _joined.toLocaleString("default", { month: "short" });

  return (
    <>
      <div className="my-2">
        <div className="text-[20px] font-[800] leading-none">{name}</div>
        <div className="text-sm text-slate-500 font-[400]">@{username}</div>
      </div>
      <p className="text-sm leading-tight">
        {description}
        {description && <br />}
        User @unofficial <b>Twitter.</b>
      </p>
      <div className="flex gap-x-2 text-slate-500">
        <div className="my-2 flex gap-x-1 items-center">
          <BiLinkAlt className="w-4 h-4" />
          <Link
            href="https://twitter.com/itsbohara"
            target="_blank"
            className="text-sm leading-none ml-1 text-blue-400"
          >
            twitter.com
          </Link>
        </div>
        <div className="my-2 flex gap-x-1 items-center">
          <BiCalendar className="w-4 h-4" />
          <div className="text-sm leading-none">
            Joined {`${joinedMonth} ${_joined.getFullYear()}`}
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="flex gap-x-1">
          <div className="text-sm font-bold leading-none">{following}</div>
          <div className="text-sm text-slate-500 leading-none">Following</div>
        </div>
        <div className="flex gap-x-1">
          <div className="text-sm font-bold leading-none">{followers}</div>
          <div className="text-sm text-slate-500 leading-none">Followers</div>
        </div>
      </div>
    </>
  );
};

export default ProfileUserInfo;
