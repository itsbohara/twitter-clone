import Button from "@ui/Button";
import useAuth from "@/hooks/useAuth";
import cx from "classnames";
import Avatar from "@rd/Avatar";
import ProfileUserInfo from "@ui/ProfileUserInfo";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../utils/string";
import ProfileAvatar from "@ui/radix/ProfileAvatar";
import http from "../../client/axios";
import EditProfileDialog from "../../components/modals/EditProfileDialog";

export default function AccountInfo({ user, refreshProfile }) {
  const { user: currentUser } = useAuth();
  const isMe = user?.username === currentUser.username;

  const { following, followers } = user?.count;
  const [isFollowing, setIsFollowing] = useState(
    user?.following ? true : false
  );

  async function toggleFollowing() {
    if (isFollowing) {
      // unfollow
      await http.delete(`/follow/${user?.id}`);
      setIsFollowing(false);
    } else {
      await http.post(`/follow/${user?.id}`);
      setIsFollowing(true);
    }
    refreshProfile();
  }
  function handleEditProfile() {}

  return (
    <>
      <div>
        <div
          className="w-full bg-cover bg-no-repeat bg-center"
          style={{
            height: "200px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1630694093867-4b947d812bf0)",
          }}
        >
          <img
            className="opacity-0 w-full h-full"
            src="https://images.unsplash.com/photo-1630694093867-4b947d812bf0"
            alt="Profile Cover"
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* <!-- Avatar --> */}
            <div className="flex justify-between flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <div className="md rounded-full relative avatar border-4 border-white">
                  <ProfileAvatar
                    src={user?.profile}
                    alt={user?.name}
                    initials={getNameInitials(user?.name)}
                  />
                  {/* <div className="absolute">Edit</div> */}
                </div>
              </div>
            </div>
            {/* Profile Btns */}
            <div className="flex gap-x-2 items-center">
              {isMe && <EditProfileDialog />}
              {!isMe && (
                <>
                  {/* more menu btn */}
                  <Button
                    center
                    onClick={toggleFollowing}
                    intent={isFollowing ? "outline" : "primary"}
                  >
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="py-4 pb-1 w-full flex flex-col gap-y-2">
            <ProfileUserInfo
              name={user?.name}
              username={user?.username}
              description={user?.bio}
              following={following}
              followers={followers}
              joinedDate={user?.createdAt}
            />
            {/* <div className="text-[13px] font-medium text-slate-500">
              Not followed by anyone you’re following
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
