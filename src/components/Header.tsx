import useScreenWidth from "../hooks/useScreenWidth";
import useAuth from "../hooks/useAuth";
import { getNameInitials } from "../utils/string";
import HeaderProfileAvatar from "@/sections/header/HeaderProfileAvatar";
import { Text } from "./Text";
const Header = ({ title }: { title: string }) => {
  const { isMobile } = useScreenWidth();

  return (
    <div className="sticky bg-white/75 z-10 backdrop-blur-md top-0">
      <div className="flex items-center px-4 py-3">
        {isMobile && <UserAvatar />}
        <div>
          {/* <Text variant="large/bold">Home</Text> */}
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
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
