import * as Toast from "@radix-ui/react-toast";

import "../styles/styles.css";
import "../styles/toast.css";

import { AuthProvider } from "@/contexts/JWTContext";
import { Provider as ReduxProvider } from "react-redux";

import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { store } from "../redux/store";
import ToastContainer from "@ui/ToastContainer";
import { useRouter } from "next/router";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import useAuth from "../hooks/useAuth";
import { SiTwitter } from "react-icons/si";

const myFont = localFont({
  src: "../../fonts/Mona-Sans.woff2",
  variable: "--font-mona-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Toast.Provider swipeDirection="right">
      <AuthProvider>
        <ReduxProvider store={store}>
          <main className={`${myFont.variable} font-sans min-h-screen`}>
            <TwitterCloneAppBoot Component={Component} pageProps={pageProps} />
            <ToastContainer />
          </main>
        </ReduxProvider>
      </AuthProvider>
    </Toast.Provider>
  );
}

const authRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/reset-password",
];

function TwitterCloneAppBoot({ Component, pageProps }) {
  const { pathname, push } = useRouter();
  const guestRoute = authRoutes.includes(pathname) ?? false;

  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="flex flex-col justify-center text-center min-h-screen">
        <SiTwitter className="mx-auto text-[#1da1f2] mb-4 w-10 h-10" />
        <p>Loading .... </p>
      </div>
    );
  }

  if (guestRoute && !isAuthenticated) {
    return (
      <GuestGuard>
        <Component {...pageProps} />
      </GuestGuard>
    );
  }
  if (guestRoute && isAuthenticated && pathname != "/") push("/");

  return (
    <AuthGuard>
      <Component {...pageProps} />;
    </AuthGuard>
  );
}
