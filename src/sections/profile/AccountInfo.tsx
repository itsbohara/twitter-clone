import Button from "@ui/Button";
import useAuth from "@/hooks/useAuth";
import cx from "classnames";
import Avatar from "@rd/Avatar";
import ProfileUserInfo from "@ui/profile/ProfileUserInfo";
import { useEffect, useState } from "react";
import { getNameInitials } from "../../utils/string";
import http from "../../client/axios";
import EditProfileDialog from "../../components/modals/EditProfileDialog";
import { useAppDispatch } from "../../hooks/useApp";
import { setInfoNotice } from "@/redux/slices/notice";
import UserProfileAvatar from "./UserProfileAvatar";
import { relativeCDNUrl } from "../../utils/url";
import UserProfileCover from "./UserProfileCover";

export default function AccountInfo({ user, refreshProfile }) {
  const { user: currentUser, isAuthenticated } = useAuth();
  const isMe = user?.username === currentUser?.username;

  const { following, followers } = user?.count;
  const [isFollowing, setIsFollowing] = useState(
    user?.following ? true : false
  );

  const dispatch = useAppDispatch();

  async function toggleFollowing() {
    if (!isAuthenticated)
      return dispatch(
        setInfoNotice({ message: "Login/Sign Up to Like Tweet" })
      );
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
        <div className="w-full h-36 xs:h-44 sm:h-48 bg-cover bg-no-repeat bg-center">
          {user?.profileCover ? (
            <UserProfileCover cover={user?.profileCover} name={user?.name} />
          ) : (
            <div className="h-full bg-slate-300 dark:bg-slate-600" />
          )}
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* <!-- Avatar --> */}
            <div className="flex justify-between flex-1">
              <div style={{ marginTop: "-6rem" }}>
                <UserProfileAvatar user={user} />
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
            <ProfileUserInfo user={user} />
            {/* <div className="text-[13px] font-medium text-slate-500">
              Not followed by anyone you’re following
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
