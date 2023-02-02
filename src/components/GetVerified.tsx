import * as DialogPrimitive from "@radix-ui/react-dialog";
import { HiOutlineXMark, HiOutlinePencil } from "react-icons/hi2";
import Button from "@ui/Button";

import React from "react";
import NavItem from "./NavItem";
import { GoVerified } from "react-icons/go";
import TwitterBlueBadge from "./badges/TwitterBlue";
import cx from "classnames";
import { useState } from "react";

import { forwardRef } from "react";
import http from "@/client/axios";
import { useAppDispatch } from "../hooks/useApp";
import { setErrorNotice, setNotice } from "@/redux/slices/notice";
import useAuth from "@/hooks/useAuth";

const accountTypeOptions = [
  "Person",
  "Business",
  "Government",
  "Government/Other",
];

export default function GetVerified() {
  const { fetchCurrentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  async function handleVerify(e) {
    e.preventDefault();
    try {
        await http.post("/account/confirm-password", { password });
        await http.post("/account/get-verified", { accountType });
        fetchCurrentUser();
      dispatch(
        setNotice({
          message: "Congrats 🎇, Now You're Blue verified ",
        })
      );
      setOpen(false);
    } catch (error: any) {
      dispatch(
        setErrorNotice({ message: error?.toString() ?? "Verification Failed!" })
      );
    }
  }
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <NavItem button width="inline" size="default">
          <GoVerified className="w-6 h-6" />
          <div
            className={"hidden xl:inline-flex flex-none text-lg font-medium"}
          >
            Get Verified
          </div>
        </NavItem>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
        <DialogPrimitive.Content className="DialogContent bg-white px-4 pt-4 pb-8 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          <div className="flex items-center mb-4 gap-x-4">
            <DialogPrimitive.Close asChild className="">
              <button
                className="IconButton p-2 hover:bg-slate-200 rounded-full"
                aria-label="Close"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Title className="DialogTitle ">
              <h2 className="text-lg font-bold">Twitter Blue</h2>
            </DialogPrimitive.Title>
          </div>
          <TwitterBlueBadge className="h-20 w-20 m-auto mb-2" />
          <DialogPrimitive.Description className=" text-slate-600 dark:text-slate-300">
            Confirm your details to Get a Verified Badge.
          </DialogPrimitive.Description>

          <form className="my-4" onSubmit={handleVerify}>
            <div className="flex flex-col gap-y-6">
              <div>
                <p className="font-bold"></p>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Account Type
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option selected>Choose a account type</option>
                  {accountTypeOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={cx(
                  "relative rounded ring-1 transition-shadow duration-200",
                  `focus-within:ring-2 
                  focus-within:ring-blue-500 dark:ring-dark-border`
                )}
              >
                <input
                  className={cx(
                    "peer mt-4 w-full bg-inherit px-3 py-1.5 placeholder-transparent appearance-none outline-none transition",
                    "border-0 focus:outline-none focus:ring-0"
                  )}
                  id="password"
                  type="password"
                  placeholder={"Confirm Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <label
                  className={cx(
                    `group-peer absolute left-3 translate-y-1 bg-main-background text-sm
                    text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:translate-y-3
             peer-placeholder-shown:text-lg peer-focus:translate-y-1 peer-focus:text-sm`,
                    "peer-focus:text-blue-500"
                  )}
                  htmlFor="password"
                >
                  Confirm Password
                </label>
              </div>
              <Button className="w-full green" center type="submit">
                Get Verified
              </Button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
