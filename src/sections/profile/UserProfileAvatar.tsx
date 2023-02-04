import ProfileAvatar from "@ui/radix/ProfileAvatar";
import React from "react";
import { getNameInitials } from "@util/string";
import { useModal } from "@hook/useModal";
import ImageViewer from "@ui/modals/ImageViewer";

export default function UserProfileAvatar({ user }) {
  const { open, openModal, closeModal } = useModal();
  return (
    <div className="z-10 md rounded-full relative avatar border-4 border-white ">
      <ProfileAvatar
        src={user?.profile}
        alt={user?.name}
        initials={getNameInitials(user?.name)}
      />
      <div
        onClick={() => openModal()}
        className="absolute cursor-pointer right-0 left-0 top-0 bottom-0 rounded-full h-[130px] hover:bg-[#33333326]"
      ></div>
      {open && (
        <ImageViewer
          image={user?.profile}
          shouldOpen={open}
          onViewerClose={closeModal}
        />
      )}
    </div>
  );
}
