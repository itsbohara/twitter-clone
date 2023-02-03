import { HiHeart, HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { RiUser3Fill, RiDeleteBinLine } from "react-icons/ri";
import { GoBell } from "react-icons/go";
import ProfileAvatar from "@ui/radix/ProfileAvatar";
import Avatar from "@rd/Avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import http from "@/client/axios";
import Loader from "@ui/Loading";
import useAuth from "../../hooks/useAuth";
import NotificationItem from "./NotificationItem";

export default function AllNotifications() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const notRes = await http.get("/notifications");
    setNotifications(notRes.data);
    setLoading(false);
  };

  if (loading) return <Loader />;
  if (notifications?.length < 1) {
    return <h2 className="text-xl font-bold p-4">No Notifications</h2>;
  }

  return (
    <>
      {/* TODO new tweet nofication */}
      {/* <div className="flex p-1 py-2 hover:bg-slate-100 hover:cursor-pointer notification-tweet">
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
            New Tweet notifications for <b>{item?.from?.username}</b>
          </p>
        </div>
      </div> */}

      {notifications.map((item) => (
        <NotificationItem
          key={item?.id}
          notification={item}
          onDeleteNotification={fetchNotifications}
        />
      ))}
    </>
  );
}
