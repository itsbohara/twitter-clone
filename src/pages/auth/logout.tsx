import { useEffect } from "react";
import useAuth from "@hook/useAuth";
import { useRouter } from "next/router";
import AppLoading from "@ui/AppLoading";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/auth/login");
  }, []);

  return <AppLoading />;
}
