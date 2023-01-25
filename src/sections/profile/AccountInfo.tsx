import Button from "@ui/Button";
import useAuth from "@/hooks/useAuth";
import cx from "classnames";
import Avatar from "@rd/Avatar";
import ProfileUserInfo from "@ui/ProfileUserInfo";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../utils/string";
import ProfileAvatar from "@ui/radix/ProfileAvatar";

export default function AccountInfo({ user }) {
  const { user: currentUser } = useAuth();
  const isMe = user?.username === currentUser.username;
  const { following, followers } = user?.count;
  return (
    <>
      <div className="mt-7">
        <div className="p-4 w-full flex flex-col gap-y-2">
          <div className="flex justify-between items-start">
            <ProfileAvatar
              src={user?.profile}
              alt={user?.name}
              initials={getNameInitials(user?.name)}
            />
            <div>
              {isMe && (
                <Button intent="outline" center>
                  <span>Edit Profile</span>
                </Button>
              )}
              {!isMe && (
                <Button center>
                  <span>Follow</span>
                </Button>
              )}
            </div>
          </div>
          <ProfileUserInfo
            name={user?.name}
            username={user?.username}
            description={user?.bio}
            following={following}
            followers={followers}
            joinedDate={user?.createdAt}
          />
          <div className="text-[13px] font-medium text-slate-500">
            Not followed by anyone you’re following
          </div>
        </div>
      </div>
    </>
  );
}
