import Avatar from "@rd/Avatar";
import Button from "@ui/Button";
import Link from "next/link";
import { useState } from "react";
import { getNameInitials } from "@util/string";
import http from "../../client/axios";
import useAuth from "@hook/useAuth";
import { useRouter } from "next/router";

interface Props {
  id?: string;
  name: string;
  username: string;
  profile: string;
  following?: boolean;
}

const SearchUserItem = ({ id, name, username, profile, following }: Props) => {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(following);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  // un/follow
  async function handleFollow() {
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
