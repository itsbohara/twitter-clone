import useScreenWidth from "@hook/useScreenWidth";
import useAuth from "@hook/useAuth";
import { getNameInitials } from "@util/string";
import HeaderProfileAvatar from "@sections/header/HeaderProfileAvatar";
import { Text } from "./Text";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";
const Header = ({ title }: { title: string }) => {
  const { isMobile } = useScreenWidth();

  const { push } = useRouter();
  const { logout, isAuthenticated } = useAuth();
  function handleLogout() {
    logout();
    push("/auth/login");
  }

  return (
    <div className="sticky bg-white/75 z-10 backdrop-blur-md top-0">
      <div className="flex items-center px-4 py-3">
        {isMobile && <UserAvatar />}
        <div className="flex-1">
          {/* <Text variant="large/bold">Home</Text> */}
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        {/* TODO : remove this from header section */}
        {isMobile && isAuthenticated && (
          <button
            onClick={handleLogout}
            className="IconButton p-2 hover:bg-red-200 flex rounded-full"
            aria-label="Logout"
          >
            <AiOutlineLogout className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

function UserAvatar() {
  const { user } = useAuth();
  if (!user) return <></>; // no data patch
  return (
    <>
      <HeaderProfileAvatar
        alt={user?.name}
        src={user?.profile}
        initials={getNameInitials(user?.name)}
        username={user?.username}
      />
    </>
  );
}

export default Header;
