import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import Avatar from "@rd/Avatar";
import { HiHeart, HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { RiDeleteBinLine, RiUser3Fill } from "react-icons/ri";
import http from "@/client/axios";
import { getNameInitials } from "../../utils/string";

export default function NotificationItem({
  notification,
  onDeleteNotification,
}) {
  const { user } = useAuth();
  async function deleteNotification(e) {
    e.preventDefault();
    await http.delete(`/notification/${notification?.id}`);
    onDeleteNotification();
  }

  if (notification?.type === "LIKE") {
    return (
      <Link href={`/${user?.username}/status/${notification?.tweet}`}>
        <div className="group flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-follow">
          <HiHeart className="text-[#f91880] ml-4 mr-1 w-[25px] h-[25px] " />
          <div className="flex flex-col gap-2 flex-1">
            <NotificationOwner
              username={notification?.from?.username}
              name={notification?.from?.name}
              profile={notification?.from?.profile}
            />
            <p>
              <b>{notification?.from?.name}</b> Liked your tweet
            </p>
          </div>
          <NotificationAction onDelete={deleteNotification} />
        </div>
      </Link>
    );
  }

  if (notification?.type === "FOLLOW") {
    return (
      <div className="group flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-follow">
        <RiUser3Fill className="text-blue-400 ml-4 mr-1 w-[33px] h-[33px] " />
        <div className="flex flex-col gap-2 flex-1">
          <NotificationOwner
            username={notification?.from?.username}
            name={notification?.from?.name}
            profile={notification?.from?.profile}
          />
          <p>
            <b>{notification?.from?.name}</b> followed you
          </p>
        </div>

        <NotificationAction onDelete={deleteNotification} />
      </div>
    );
  }
  if (notification?.type === "REPLY") {
    return (
      <Link href={`/${user?.username}/status/${notification?.tweet}`}>
        <div className="group flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-follow">
          <HiOutlineChatBubbleOvalLeft className="text-blue-400 ml-3 mr-1 w-[30px] h-[30px] " />
          <div className="flex flex-col gap-2 flex-1">
            <NotificationOwner
              username={notification?.from?.username}
              name={notification?.from?.name}
              profile={notification?.from?.profile}
            />
            <p>
              <b>{notification?.from?.name}</b> replied to your Tweet
            </p>
          </div>

          <NotificationAction onDelete={deleteNotification} />
        </div>
      </Link>
    );
  }

  return <></>;
}

function NotificationOwner({ username, name, profile }) {
  const nameInitials = getNameInitials(name);
  return (
    <div>
      <Link
        className="ImageTrigger items-center rounded-full overflow-hidden"
        href={`/${username}`}
      >
        <Avatar
          src={profile}
          alt={`Profile of ${username}`}
          initials={nameInitials}
        />
      </Link>
    </div>
  );
}

function NotificationAction({ onDelete }) {
  return (
    <div className="hidden group-hover:flex items-center pr-2">
      <div
        className=" hover:text-[#f91880] cursor-pointer z-[1]"
        onClick={onDelete}
      >
        <div className="relative">
          <div className="absolute rounded-full m-[-8px] hover:bg-[#f9188033] top-0 bottom-0 left-0 right-0"></div>

          <RiDeleteBinLine className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
