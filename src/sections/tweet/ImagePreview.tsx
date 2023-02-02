import Image from "next/image";
import React, { useState } from "react";
import { relativeCDNUrl } from "../../utils/url";
import { useModal } from "../../hooks/useModal";
import ImageViewer from "@ui/modals/ImageViewer";
import classNames from "classnames";

export default function ImagePreview({
  images,
  isSingleTweet,
}: {
  images?;
  isSingleTweet?: boolean;
}) {
  const { open, openModal, closeModal } = useModal();
  const [image, setImage] = useState("");
  function zoomImage(image) {
    setImage(relativeCDNUrl(image?.path));
    openModal();
  }
  return (
    <>
      {images.map((item, i) => (
        <div key={`image-${i}-${item?.id}`} className="relative w-full">
          <Image
            fill={true}
            style={{ objectFit: "cover" }}
            className={classNames(
              "!relative  rounded-3xl w-full",
              //   isSingleTweet ? "max-h-96" :
              "max-h-full"
            )}
            src={relativeCDNUrl(item?.path)}
            alt="Tweet attachment"
          />
          <div
            onClick={() => zoomImage(item)}
            className="absolute rounded-3xl cursor-pointer right-0 left-0 top-0 bottom-0 hover:bg-[#33333326]"
          ></div>
        </div>
      ))}
      {open && (
        <ImageViewer
          image={image}
          shouldOpen={open}
          onViewerClose={closeModal}
        />
      )}
    </>
  );
}
