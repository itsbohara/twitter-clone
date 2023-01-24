import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/auth/login");
  }, []);

  return <p>Processing...</p>;
}
