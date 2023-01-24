import PropTypes from "prop-types";
import { useState } from "react";
// hooks
import useAuth from "@/hooks/useAuth";
// pages
import Login from "@/pages/auth/login";

import { useRouter } from "next/router";

import { SiTwitter } from "react-icons/si";
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<any>(null);

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center text-center min-h-screen">
        <SiTwitter className="mx-auto text-[#1da1f2] mb-4 w-10 h-10" />
        <p>Loading .... </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // return <AuthPage />;
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
