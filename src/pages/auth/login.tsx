import NavItem from "@ui/NavItem";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { SiTwitter } from "react-icons/si";
import Button from "../../components/Button";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useApp";
import { setErrorNotice } from "@/redux/slices/notice";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      dispatch(setErrorNotice({ message: error }));
    }
    setLoading(false);
  }
  return (
    <>
      <Head>
        <title>Log in to Twitter | Twitter Clone</title>
      </Head>
      <div className="pt-6 m-auto w-5/6">
        <div className="flex justify-center mb-4">
          <NavItem href="/home" width="inline" size="default">
            <SiTwitter className="w-6 h-6" />
            <h6 className="text-md font-semibold">Twitter Clone</h6>
          </NavItem>
        </div>

        <div className="card max-w-md m-auto">
          <h6 className="text-lg font-semibold">Login to Continue</h6>
          <form
            className="flex flex-col gap-y-2 mt-4"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full flex items-center pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-medium py-2 bg-slate-100 border-slate-100 placeholder:text-slate-700 rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full flex items-center pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-medium py-2 bg-slate-100 border-slate-100 placeholder:text-slate-700 rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-col mt-2 mb-6">
              <Button intent="primary" center disabled={loading}>
                <div className="flex items-center">
                  {loading && (
                    <svg
                      fill="none"
                      className="h-6 w-6 animate-spin text-white"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      />
                    </svg>
                  )}
                  <span>Login</span>
                </div>
              </Button>
            </div>
            <Button href="/auth/reset-password" intent="outline" center>
              <span>Forgot password?</span>
            </Button>
          </form>
          <p className="mt-5">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-[#1da1f2]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
