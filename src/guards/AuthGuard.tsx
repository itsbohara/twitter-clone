import PropTypes from "prop-types";
import { useState } from "react";
// hooks
import useAuth from "@/hooks/useAuth";
// pages
import Login from "@/pages/auth/login";

import { useRouter } from "next/router";

import { SiTwitter } from "react-icons/si";
import AppLoading from "../components/AppLoading";
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  if (!isInitialized) return <AppLoading />;

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    console.warn("push ");

    // setRequestedLocation(null);
    // push(requestedLocation);
    // return <></>;
  }

  return <>{children}</>;
}
