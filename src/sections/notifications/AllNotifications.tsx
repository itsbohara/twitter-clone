import { HiHeart } from "react-icons/hi2";
import { RiUser3Fill } from "react-icons/ri";
import { GoBell } from "react-icons/go";
import ProfileAvatar from "@ui/radix/ProfileAvatar";
import Avatar from "@rd/Avatar";
import Link from "next/link";

export default function AllNotifications() {
  return (
    <>
      <div className="flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-tweet">
        <GoBell className="text-blue-300 ml-4 mr-1 w-[25px] h-[25px] " />
        <div className="flex flex-col gap-2">
          <div>
            <Link
              className="ImageTrigger items-center rounded-full overflow-hidden bg-white"
              href={`/`}
            >
              <Avatar
                src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_200x200.jpg"
                alt={"alt"}
                initials={"MB"}
              />
            </Link>
          </div>
          <p>
            New Tweet notifications for <b>User</b>
          </p>
        </div>
      </div>

      <div className="flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-follow">
        <HiHeart className="text-[#f91880] ml-4 mr-1 w-[25px] h-[25px] " />
        <div className="flex flex-col gap-2">
          <div>
            <Link
              className="ImageTrigger items-center rounded-full overflow-hidden bg-white"
              href={`/`}
            >
              <Avatar
                src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_200x200.jpg"
                alt={"alt"}
                initials={"MB"}
              />
            </Link>
          </div>
          <p>
            <b>User</b> Liked your tweet
          </p>
        </div>
      </div>

      <div className="flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-follow">
        <RiUser3Fill className="text-blue-400 ml-4 mr-1 w-[33px] h-[33px] " />
        <div className="flex flex-col gap-2">
          <div>
            <Link
              className="ImageTrigger items-center rounded-full overflow-hidden bg-white"
              href={`/`}
            >
              <Avatar
                src="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_200x200.jpg"
                alt={"alt"}
                initials={"MB"}
              />
            </Link>
          </div>
          <p>
            <b>User</b> followed you
          </p>
        </div>
      </div>
    </>
  );
}
