// hooks
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
  }

  return <>{children}</>;
}
