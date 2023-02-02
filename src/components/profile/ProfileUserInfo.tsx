import Link from "next/link";
import { BiCalendar, BiLinkAlt } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import TwitterBlueCheck from "../TwitterBlueCheck";

const ProfileUserInfo = ({ user }) => {
  const {
    name,
    username,
    count: { following, followers },
    createdAt,
    location,
    follows,
  } = user;

  const _joined = new Date(createdAt);
  const joinedMonth = _joined.toLocaleString("default", { month: "short" });

  const getBioUrl = () => {
    const defaultURL = "https://twitter.com/itsbohara";
    let bioUrl = user.url;
    try {
      if (!bioUrl || bioUrl?.trim() == "") bioUrl = defaultURL;
      const url = new URL(bioUrl); // try to parse as a url
    } catch (error) {
      bioUrl = `https://${bioUrl}`;
    }
    return bioUrl;
  };

  const userBioUrl = getBioUrl();
  const userLink = user?.url && user?.url.trim() !== "";

  return (
    <>
      <div className="my-2">
        <div className="flex text-[20px] font-[800] leading-none">
          <span>{name}</span>
          <TwitterBlueCheck account={user?.account} />
        </div>
        <div className="flex items-center text-sm text-slate-500 font-[400]">
          <span>@{username}</span>
          {follows && (
            <span className="ml-1 rounded bg-slate-200 px-1 py-0.25 text-xs">
              Follows you
            </span>
          )}
        </div>
      </div>
      <p className="text-sm leading-tight">{user?.bio}</p>
      <div className="flex gap-x-3 text-slate-500">
        {location && (
          <div className="my-2 flex gap-x-1 items-center">
            <IoLocationOutline className="w-4 h-4" />
            <div className="text-sm leading-none">{location}</div>
          </div>
        )}
        {userLink && (
          <div className="my-2 flex gap-x-1 items-center">
            <BiLinkAlt className="w-4 h-4" />
            <Link
              href={userBioUrl}
              target="_blank"
              className="text-sm leading-none ml-1 text-blue-400"
            >
              {user?.url}
            </Link>
          </div>
        )}
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
