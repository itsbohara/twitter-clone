import * as Dialog from "@radix-ui/react-dialog";
import { HiOutlineXMark, HiOutlinePencil } from "react-icons/hi2";
import Button from "@ui/Button";
import { useState } from "react";
import Image from "next/image";
import { relativeCDNUrl } from "../../utils/url";

const ImageViewer = ({
  image,
  shouldOpen,
  onViewerClose,
}: {
  image;
  shouldOpen?: boolean;
  onViewerClose?: Function;
}) => {
  const [open, setOpen] = useState(shouldOpen);
  const handleOpenChange = (open) => {
    setOpen(open);
    if (!open) onViewerClose?.();
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
        <Dialog.Content className="DialogContent h-full pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          {/* <Dialog.Title className="DialogTitle font-semibold flex items-center"></Dialog.Title> */}
          <Dialog.Close
            asChild
            className="z-[1] -top-1 max-sm:left-[90%] max-sm:top-1 -left-10 items-center absolute"
          >
            <button
              className="bg-slate-400 p-2 hover:bg-slate-200 rounded-full"
              aria-label="Close"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </Dialog.Close>
          <div className="flex relative h-full w-full">
            <Image
              fill={true}
              style={{ objectFit: "contain" }}
              alt=""
              src={relativeCDNUrl(image)}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageViewer;
