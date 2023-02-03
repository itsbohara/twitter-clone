import React, { Suspense } from "react";
import { useModalAction, useModalState } from "@/contexts/ModalContext";
import * as Dialog from "@radix-ui/react-dialog";
import { HiOutlineXMark } from "react-icons/hi2";
import { SiTwitter } from "react-icons/si";
import AuthBoardingModal from "@ui/auth/Boarding";
import Loading from "@ui/Loading";

const ManagedModal: React.FC = () => {
  const { isOpen, view, loading } = useModalState();
  const { closeModal } = useModalAction();

  // TOOD :
  // if (view === "IMAGE_VIEWER") return <ImageViewer />;

  const handleClose = () => {
    if (!loading) closeModal();
  };

  const handleOpenChange = (open) => {
    if (!open) handleClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />

        <Dialog.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          <Dialog.Close asChild>
            <button
              className="absolute left-2 top-2 hover:bg-slate-200 rounded-full p-2"
              aria-label="Close"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </Dialog.Close>

          <Suspense fallback={<Loading />}>
            {view === "AUTH_BOARDING" && <AuthBoardingModal />}
          </Suspense>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default ManagedModal;
