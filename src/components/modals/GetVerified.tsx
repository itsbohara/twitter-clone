import Button from "@ui/Button";

import React from "react";
import TwitterBlueBadge from "../badges/TwitterBlue";
import cx from "classnames";
import { useState } from "react";

import http from "@/client/axios";
import { useAppDispatch } from "../../hooks/useApp";
import { setErrorNotice, setNotice } from "@/redux/slices/notice";
import useAuth from "@/hooks/useAuth";
import { useModalAction, useModalState } from "@/contexts/ModalContext";
import Loading from "@ui/Loading";

const accountTypeOptions = [
  "Person",
  "Business",
  "Government",
  "Government/Other",
];

export default function GetVerified() {
  const { closeModal, setLoading } = useModalAction()
  const { loading } = useModalState()
  const { fetchCurrentUser } = useAuth();
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true)
    try {
      await http.post("/account/confirm-password", { password });
      await http.post("/account/get-verified", { accountType });
      fetchCurrentUser();
      dispatch(
        setNotice({
          message: "Congrats 🎇, Now You're Blue verified ",
        })
      );
      closeModal();
    } catch (error: any) {
      dispatch(
        setErrorNotice({ message: error?.toString() ?? "Verification Failed!" })
      );
    }
    setLoading(false)
  }
  return (
    <div className='p-3 max-sm:px-1 flex flex-col gap-8'>
      {/* {loading &&
        <div className="absolute flex h-full w-full left-0 top-0 bg-slate-50 opacity-50">
          <div className="m-auto"><Loading /></div>
        </div>} */}
      <div className="flex justify-center mb-4">
        <h2 className="text-lg font-bold">Twitter Blue</h2>
      </div>
      <TwitterBlueBadge className="h-20 w-20 m-auto mb-2" />
      <p className=" text-slate-600 dark:text-slate-300">
        Confirm your details to Get a Verified Badge.
      </p>

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
    </div>
  );
}
