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
export default function ProfilePage() {
  const { query } = useRouter();
  const { user: currentUser } = useAuth();
  const username = query["username"];
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const isMe = currentUser?.username === username;
    const fetchUserProfile = async () => {
      await delay(500);
      if (!isMe) {
        // get user profile
        console.log("fetch user ", query);
        setUser(query);
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };
    fetchUserProfile();
    return () => setLoading(true);
  }, [query]);

  return (
    <>
      <Head>
        <title>Profile | Twitter Clone</title>
      </Head>
      <div className="min-h-screen flex max-w-7xl mx-auto xl:grid xl:grid-cols-10 gap-5">
        <Nav />
        <main className="col-span-5  flex-1 w-full flex-col">
          <Header title={`${user?.name ?? "Profile"}`} />

          {loading && <p className="text-center">Loading...</p>}
          {!loading && (
            <>
              <AccountInfo user={user} />
              <ProfileTabs username={username} />
            </>
          )}
        </main>
      </div>
    </>
  );
}
