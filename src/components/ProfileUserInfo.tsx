import { BiCalendar } from "react-icons/bi";

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
}) => (
  <>
    <div className="my-2">
      <div className="text-[20px] font-[800] leading-none">{name}</div>
      <div className="text-sm text-slate-500 font-[400]">@{username}</div>
    </div>
    <div className="text-sm">Welcome to Twitter Clone {description}</div>
    <div className="my-2 text-slate-500 flex gap-x-1 items-center">
      <BiCalendar className="w-4 h-4" />
      <div className="text-sm leading-none">Joined {joinedDate}</div>
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

export default ProfileUserInfo;
