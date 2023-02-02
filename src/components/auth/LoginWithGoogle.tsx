import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
declare global {
  interface Window {
    google: any;
  }
}

export default function LoginWithGoogleButton({
  onLogin,
}: {
  onLogin?: Function;
}) {
  const googletBtnRef: any = useRef(null);
  const { googleLogin } = useAuth();

  const handleGoogleLoginResponse = async (res) => {
    await googleLogin(res?.credential);
    onLogin?.();
  };

  useEffect(() => {
    const initializeGsi = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLoginResponse,
      });

      window.google.accounts.id.renderButton(
        googletBtnRef.current,
        {
          theme: "filled_blue",
          size: "large",
          type: "standard",
          shape: "pill",
          // width: "448",
        } // customization attributes
      );
    };

    // load gsi lib
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGsi;
    script.id = "google-client-script";
    document.querySelector("body")?.appendChild(script);

    return () => {
      document.getElementById("google-client-script")?.remove();
    };
  }, []);
  return <div ref={googletBtnRef} className="w-full"></div>;
}
