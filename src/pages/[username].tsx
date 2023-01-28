import Head from "next/head";
import Nav from "@ui/Nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@ui/Button";
import Header from "@ui/Header";
import ProfileTabs from "@/sections/profile/ProfileTabs";
import AccountInfo from "@/sections/profile/AccountInfo";
import useAuth from "@/hooks/useAuth";
import { delay } from "../utils/delay";
import http from "../client/axios";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import Loader from "@ui/Loader";
import AppLoading from "@ui/AppLoading";

// for 404 page
const noRoutes = ["/bookmarks/", "/explore/", "/messages/"];

export default function ProfilePage({ data, resType }) {
  const { query, asPath, push, back } = useRouter();

  const {
    user: currentUser,
    fetchCurrentUser,
    isAuthenticated,
    isInitialized,
  } = useAuth();
  const username = query["username"];

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<any>(null);
  const [notFound, setNotFound] = useState(resType === "NOT_FOUND");

  useEffect(() => {
    if (noRoutes.indexOf(asPath) !== -1) push("/404");
  }, [asPath]);

  useEffect(() => {
    if (resType === "SUCCESS" || resType === "NOT_FOUND") {
      setLoading(false);
      resType === "SUCCESS" && setUser(data);
      resType === "NOT_FOUND" && setNotFound(true);
      return;
    }
    const isMe = currentUser?.username === username;
    const fetchUserProfile = async () => {
      if (!isMe) {
        // get user profile
        await getUserProfile();
      } else {
        setUser(currentUser);
        await fetchCurrentUser();
      }
      setLoading(false);
    };
    fetchUserProfile();
    return () => {
      setLoading(true);
      setNotFound(false);
    };
  }, [query]);

  useEffect(() => {
    const isMe = currentUser?.username === username;
    if (isMe) getUserProfile();
  }, [currentUser]);

  async function getUserProfile() {
    try {
      const userRes = await http.get(`/profile/${username}`);
      setUser(userRes.data);
    } catch (error) {
      setUser({ name: "Profile" });
      setNotFound(true);
    }
  }

  const handleBackClick = () => back();

  const title = data?.name ? `${data?.name} (@${data?.username})` : "Profile";

  return (
    <>
      <Head>
        <title>{`${title} | Twitter Clone`}</title>
        {!notFound && <meta name="description" content={`${data?.bio}`} />}
      </Head>

      {!isInitialized && <AppLoading />}
      {isInitialized && (
        <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
          <Nav />
          <main className="col-span-5 border-x border-slate-200 flex-1 w-full flex-col">
            {/* Profile Nav Header */}
            <div className="sticky bg-white/75 z-10 backdrop-blur-md top-0">
              <div className="flex items-center px-4 py-3 gap-x-2">
                <div className="pr-3 py-1 mx-1">
                  <div
                    className="text-2xl font-medium rounded-full cursor-pointer hover:text-blue-300"
                    onClick={handleBackClick}
                  >
                    <IoMdArrowBack />
                  </div>
                </div>
                <h2 className="text-lg font-bold">{`${
                  user?.name ?? "Profile"
                }`}</h2>
              </div>
            </div>

            {loading && <Loader />}
            {notFound && (
              <div className="flex flex-col gap-1 items-center">
                <h2>This account doesn’t exist</h2>
                <p>Try searching for another.</p>
              </div>
            )}
            {!loading && !notFound && (
              <>
                <AccountInfo user={user} refreshProfile={getUserProfile} />
                <ProfileTabs username={username} />
              </>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  let resType = "SUCCESS";
  let data = null;
  // fetch user info
  try {
    const userRes = await http.get(`/profile/${params?.username}`);
    data = userRes.data;
  } catch (error) {
    resType = "NOT_FOUND";
  }

  // Pass data to the page via props
  return { props: { data, resType } };
}
