import * as DialogPrimitive from "@radix-ui/react-dialog";
import { HiOutlineXMark, HiOutlinePencil } from "react-icons/hi2";
import TweetForm from "../TweetForm";
import Button from "@ui/Button";
import { useState } from "react";
import useScreenWidth from "@hook/useScreenWidth";
import classNames from "classnames";

const TweetDialog = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useScreenWidth()
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <div className={classNames("sm:w-full flex justify-center xl:justify-start mt-5 appearance-none",
          isMobile ? '!absolute -top-20 right-1' : '')}>
          <Button size="large" className="!bg-[#1d9bf0]">
            <HiOutlinePencil className="w-6 h-6 xl:hidden" />
            <span className="hidden xl:flex">Tweet</span>
          </Button>
        </div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
        <DialogPrimitive.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          <DialogPrimitive.Close asChild className="mb-4">
            <button
              className="IconButton p-2 hover:bg-slate-200 rounded-full"
              aria-label="Close"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </DialogPrimitive.Close>
          <DialogPrimitive.Title className="DialogTitle sr-only">
            Tweet
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="DialogDescription sr-only">
            Make a Tweet
          </DialogPrimitive.Description>

          <TweetForm width="full" onModalClose={() => setOpen(false)} />

          {/* <DialogPrimitive.Close asChild>
          <button className="Button green">Save changes</button>
        </DialogPrimitive.Close> */}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default TweetDialog;
