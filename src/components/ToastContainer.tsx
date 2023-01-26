import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { clearNotice } from "@/redux/slices/notice";
import { useEffect, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { capitalize } from "../utils/string";

import { FaTimes } from "react-icons/fa";
import uuidv4 from "../utils/uuid";
import useIsMountedRef from "../hooks/useIsMountedRef";

export default function ToastContainer() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);
  const [toastTitle, setToastTitle] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastID, setToastID] = useState("");

  //   const { current: mounted } = useIsMountedRef();

  // handle app notifications
  const {
    message,
    variant: type,
    preventDuplicate,
  } = useAppSelector((state) => state.notice);

  useEffect(() => {
    if (message) {
      // use toastID as a message
      // todo: duplicate toasts
      //   if (preventDuplicate) setToastID(message);
      //   else setToastID(uuidv4());
      setToastID(uuidv4());
      setToastTitle(message);
      setToastType(type);
      setOpen(true);
      timerRef.current = window.setTimeout(() => {
        setOpen(false);
      }, 30000);

      dispatch(clearNotice());
    }
  }, [message]);

  return (
    <>
      <Toast.Root
        key={toastID}
        className={`ToastRoot ${toastType}`}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="ToastTitle">
          {capitalize(toastType)} : {toastTitle}
        </Toast.Title>
        {/* <Toast.Description asChild>
          <time
            className="ToastDescription"
            // dateTime={eventDateRef.current.toISOString()}
          > 
          {message}
          </time>
        </Toast.Description> */}
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Toast Action btn"
        >
          <button className="Button small p-1.5 hover:bg-[#18a6f950]">
            <FaTimes />
          </button>
          {/* <button className="Button small green">Undo</button> */}
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </>
  );
}
