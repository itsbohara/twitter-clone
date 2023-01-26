import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import cx from "classnames";
import Button from "@ui/Button";
import Avatar from "@rd/Avatar";
import UserCard from "@ui/UserCard";
import { getNameInitials } from "../../utils/string";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";

interface Props {
  profile: string;
  alt: string;
  name: string;
  username: string;
  bio?: string;
  following?: string;
  followers?: string;
}

const ProfileHoverCard = ({
  profile,
  alt,
  name,
  username,
  bio,
  following,
  followers,
}: Props) => {
  const initials = getNameInitials(name ?? "");
  const { user } = useAuth();
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <Link
          className="ImageTrigger inline-flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-white"
          href={`/${username}`}
        >
          <Avatar src={profile} alt={alt} initials={initials} />
        </Link>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          align="center"
          sideOffset={4}
          className={cx(
            "HoverCardPrimitiveContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "w-72 rounded-lg p-4",
            "bg-white border border-slate-200 shadow-xl",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          )}
        >
          <div className="w-full flex flex-col gap-y-2">
            <div className="flex justify-between items-start">
              <Avatar src={profile} alt={alt} initials={initials} />
              {user?.username !== username && (
                <div>
                  <Button intent="outline" size="default">
                    Following
                  </Button>
                </div>
              )}
            </div>
            <UserCard
              name={name}
              username={username}
              description={bio}
              following={following}
              followers={followers}
            />
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

export default ProfileHoverCard;
