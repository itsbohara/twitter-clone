import Avatar from "@rd/Avatar";
import Button from "@ui/Button";
import Link from "next/link";
import { useState } from "react";
import { getNameInitials } from "@util/string";
import http from "../../client/axios";
import useAuth from "@hook/useAuth";
import { useRouter } from "next/router";
import { useModalAction } from "../../contexts/ModalContext";
import { BsPersonPlus } from "react-icons/bs";

interface Props {
  id?: string;
  name: string;
  username: string;
  profile: string;
  following?: boolean;
}

const SearchUserItem = ({ id, name, username, profile, following }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const [isFollowing, setIsFollowing] = useState(following);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const { openModal } = useModalAction();
  // un/follow
  async function handleFollow() {
    if (!isAuthenticated) {
      openModal("AUTH_BOARDING", {
        icon: <BsPersonPlus className="w-12 h-12 text-[#1da1f2]" />,
        title: `Follow ${name} to see what they share on Twitter.`,
        desc: "Sign up so you never miss their Tweets.",
      });
      return;
    }
    setIsFollowing(!isFollowing);
    if (isFollowing) await http.delete(`/follow/${id}`);
    else await http.post(`/follow/${id}`);
  }

  const onUserClick = () => router.push(`/${username}`);

  return (
    <div className="flex flex-1 items-center gap-x-2 px-4 py-3 hover:bg-slate-200">
      <div
        className="flex items-center gap-x-2 flex-1 cursor-pointer"
        onClick={onUserClick}
      >
        <div className="flex flex-1 xl:flex-none justify-center xl:justify-start">
          <Avatar src={profile} alt={name} initials={getNameInitials(name)} />
        </div>
        <div className="hidden xl:flex flex-col ">
          <Link href={`/${username}`} className="text-base font-semibold">
            {name}
          </Link>
          <p className="text-sm text-slate-600 font-medium">@{username}</p>
        </div>
      </div>
      {user?.username !== username && (
        <div className="">
          <Button
            onClick={handleFollow}
            size="small"
            intent={isFollowing ? "outline" : "primary"}
          >
            <span
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {isFollowing ? (hover ? "Unfollow" : "Following") : "Follow"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchUserItem;
