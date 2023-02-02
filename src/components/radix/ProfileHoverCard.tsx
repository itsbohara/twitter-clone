import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import cx from "classnames";
import Button from "@ui/Button";
import Avatar from "@rd/Avatar";
import UserCard from "@ui/UserCard";
import { getNameInitials } from "../../utils/string";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import { User } from "@/types/user";

const ProfileHoverCard = ({ user }: { user: User }) => {
  const {
    name,
    username,
    bio,
    profile,
    count: { followers, following },
    subscription,
  } = user;
  const initials = getNameInitials(user?.name ?? "");
  const { user: CurrentUser } = useAuth();
  const onProfileClick = (e) => e.stopPropagation();

  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <Link
          onClick={onProfileClick}
          className="ImageTrigger inline-flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-white"
          href={`/${user.username}`}
        >
          <Avatar src={user.profile} alt={name} initials={initials} />
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
              <Avatar src={profile} alt={name} initials={initials} />
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
              bio={bio}
              following={following}
              followers={followers}
              subscription={subscription}
            />
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};

export default ProfileHoverCard;
