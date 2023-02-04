import * as Toast from "@radix-ui/react-toast";

import "../styles/styles.css";
import "../styles/toast.css";

import { AuthProvider } from "@ctx/JWTContext";
import { Provider as ReduxProvider } from "react-redux";

import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import { store } from "@redux/store";
import ToastContainer from "@ui/ToastContainer";
import { useRouter } from "next/router";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import useAuth from "@hook/useAuth";
import { SiTwitter } from "react-icons/si";
import UsernameChooseDialog from "../components/modals/UsernameChooseDialog";
import Loader from "../components/Loading";
import AppLoading from "../components/AppLoading";
import { ModalProvider } from "@ctx/ModalContext";
import ManagedModal from "@ui/modals/ManagedModal";

const myFont = localFont({
  src: "../../fonts/Mona-Sans.woff2",
  variable: "--font-mona-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Toast.Provider swipeDirection="right">
      <ModalProvider>
        <AuthProvider>
          <ReduxProvider store={store}>
            <main className={`${myFont.variable} font-sans min-h-screen`}>
              <TwitterCloneAppBoot Component={Component} pageProps={pageProps} />
              <ToastContainer />
            </main>
            <ManagedModal />
          </ReduxProvider>
        </AuthProvider>
      </ModalProvider>
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
  // const guestRoute = authRoutes.includes(pathname) ?? false;
  const guestRoute = true; // demo

  const { isAuthenticated, user } = useAuth();

  if (guestRoute && !isAuthenticated) {
    return (
      <GuestGuard>
        <Component {...pageProps} />
      </GuestGuard>
    );
  }
  // if (guestRoute && isAuthenticated && pathname != "/") push("/");

  return (
    <AuthGuard>
      {!user?.username && <UsernameChooseDialog open={true} />}
      <Component {...pageProps} />;
    </AuthGuard>
  );
}
