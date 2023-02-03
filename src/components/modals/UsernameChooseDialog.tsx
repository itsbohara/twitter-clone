import * as Dialog from "@radix-ui/react-dialog";
import { HiOutlineXMark, HiOutlinePencil } from "react-icons/hi2";
import Button from "@ui/Button";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "@/client/axios";

const UsernameChooseDialog = ({ open: ShouldOpen }) => {
  const [open, setOpen] = useState(ShouldOpen);
  const { user, fetchCurrentUser } = useAuth();
  function handleOnClose(open) {
    if (!open && !user?.username) return;
    setOpen(false);
  }
  const [username, setUsername] = useState("");
  async function handleSave(e) {
    e.preventDefault();
    await axios.patch("/account/me", { username });
    await fetchCurrentUser();
    // window.location.reload();
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOnClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
        <Dialog.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          <Dialog.Close asChild className="mb-4">
            <button
              className="hover:bg-slate-200 rounded-full"
              aria-label="Close"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </Dialog.Close>
          <Dialog.Title className="DialogTitle font-semibold">
            Choose Username
          </Dialog.Title>
          <Dialog.Description className="DialogDescription sr-only">
            Choose Username
          </Dialog.Description>

          <form
            className="flex flex-col gap-y-2 mt-4"
            onSubmit={handleSave}
            autoComplete="off"
          >
            <input
              autoFocus
              type="text"
              required
              placeholder="Username"
              className="w-full flex items-center pl-10 pr-4 text-sm placeholder:text-sm placeholder:font-medium py-2 bg-slate-100 border-slate-100 placeholder:text-slate-700 rounded-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Button intent="primary" center>
              <span>Save</span>
            </Button>
          </form>
        </Dialog.Content>
        {/* <Dialog.Close asChild>
          <button className="Button green">Save changes</button>
        </Dialog.Close> */}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UsernameChooseDialog;
