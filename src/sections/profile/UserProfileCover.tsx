import ProfileAvatar from "@ui/radix/ProfileAvatar";
import React from "react";
import { getNameInitials } from "../../utils/string";
import { useModal } from "../../hooks/useModal";
import ImageViewer from "@ui/modals/ImageViewer";
import { relativeCDNUrl } from "../../utils/url";

export default function UserProfileCover({ cover, name }) {
  const { open, openModal, closeModal } = useModal();
  const coverSrc = relativeCDNUrl(cover);
  return (
    <div className=" relative h-full">
      <img
        className="w-full h-full object-cover"
        src={coverSrc}
        alt="Profile Cover"
      />
      <div
        onClick={() => openModal()}
        className="absolute z-[9] cursor-pointer right-0 left-0 top-0 bottom-0 hover:bg-[#22212172]"
      ></div>
      {open && (
        <ImageViewer
          image={coverSrc}
          shouldOpen={open}
          onViewerClose={closeModal}
        />
      )}
    </div>
  );
}
