import NavItem from "@ui/NavItem";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { SiTwitter } from "react-icons/si";
import Button from "@ui/Button";
import useAuth from "@hook/useAuth";
import { useRouter } from "next/router";
import { useAppDispatch } from "@hook/useApp";
import { setErrorNotice, setNotice } from "@redux/slices/notice";

export default function Register() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const router = useRouter();
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const registerRes = await register(name, email, password);
      dispatch(setNotice({ message: registerRes["message"] }));
      router.push("/auth/login");
    } catch (error) {
      dispatch(setErrorNotice({ message: error ?? "Failed to Sign Up" }));
    }
  }
  return (
    <>
      <Head>
        <title>Sign up for Twitter | Twitter Clone</title>
      </Head>
      <div className=" pt-6 m-auto w-5/6">
        <div className="flex justify-center mb-4">
          <NavItem href="/home" width="inline" size="default">
            <SiTwitter className="w-6 h-6" />{" "}
            <h6 className="text-md font-semibold">Twitter Clone</h6>
          </NavItem>
        </div>
        <div className="card max-w-md m-auto">
          <h6 className="text-lg font-semibold">Create your account</h6>
          <form
            className="flex flex-col gap-y-2 mt-4"
            onSubmit={handleRegister}
            autoComplete="off"
          >
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full flex items-center pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-medium py-2 bg-slate-100 border-slate-100 placeholder:text-slate-700 rounded-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              <Button intent="primary" size="default" center>
                <span>Sign Up</span>
              </Button>
            </div>
          </form>
          <p className="text-xs text-slate-700 font-medium">
            By signing up, you agree to the
            <Link href="/legal/terms" className="text-[#1da1f2]">
              &nbsp;Terms of Service &nbsp;
            </Link>
            and
            <Link href="/legal/privacy" className="text-[#1da1f2]">
              {" "}
              Privacy Policy
            </Link>
            , including Cookie Use.
          </p>

          <p className="mt-5">
            Have an account already?&nbsp;
            <Link href="/auth/login" className="text-[#1da1f2]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
