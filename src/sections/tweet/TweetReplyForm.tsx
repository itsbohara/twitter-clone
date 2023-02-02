import Avatar from "@rd/Avatar";
import Link from "next/link";
import Button from "@ui/Button";
import {
  RiImage2Line,
  RiFileGifLine,
  RiChatPollLine,
  RiEmotionLine,
  RiMapPin2Line,
} from "react-icons/ri";

import { cva } from "class-variance-authority";
import { useState, useRef, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useApp";
import { newTweet, newTweetReply } from "@/redux/slices/tweet.slice";
import { setInfoNotice } from "@/redux/slices/notice";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import http from "@/client/axios";
import { getNameInitials } from "../../utils/string";
import IndeterminateProgressBar from "@ui/IndeterminateProgressBar";

const TweetFormStyles = cva("flex flex-1 gap-x-3 relative", {
  variants: {
    width: {
      default: "p-4 border-b border-slate-200",
      full: "",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

const TweetReplyForm = ({
  tweetID,
  width,
  inputFocus = false,
  onInputBlur,
}: {
  tweetID: string;
  width: "default" | "full";
  inputFocus?: boolean;
  onInputBlur?: Function;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [compact, setCompact] = useState(true);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleTweetReplySubmit(e) {
    e.preventDefault();
    if (loading) return; // stop execution if already submitted
    setLoading(true);
    if (content.trim() === "" && images.length < 1) return;

    // check for image & upload
    let attachments: string[] = [];
    for await (const image of images) {
      const body = new FormData();
      body.append("file", image);
      const uploadedImage = await http.put("/tweet/media", body);
      attachments.push(uploadedImage.data?.id);
    }

    await dispatch(newTweetReply(tweetID, { content, attachments }));
    resetForm();
  }
  function resetForm() {
    setContent("");
    setImages([]);
    setCompact(true);
    setLoading(false);
  }

  const submitReady = content.trim() !== "";

  const chooseFile = () => fileRef.current?.click();
  const noFeature = () =>
    dispatch(setInfoNotice({ message: "Feature not implemented!" }));

  const onImageChange = (images) => {
    if (images?.length < 1) return;
    setImages(Array.from(images));
  };

  useEffect(() => {
    if (inputFocus) inputRef.current?.focus();
  }, [inputFocus]);

  return (
    <>
      {loading && (
        <div className="absolute w-full -top-6 left-0">
          <IndeterminateProgressBar />
        </div>
      )}
      <div
        className={`${TweetFormStyles({ width })} ${!compact ? "mt-3" : ""}`}
      >
        <Avatar
          src={user?.profile}
          alt={user?.name}
          initials={getNameInitials(user!.name)}
        />
        <div className="flex flex-col flex-1 gap-y-4 relative">
          <form onSubmit={handleTweetReplySubmit}>
            <div className="flex flex-col flex-1">
              <input
                ref={inputRef as any}
                type="textarea"
                placeholder="Tweet your reply"
                className="w-full py-3 text-xl border-slate-200 placeholder:text-slate-600 focus:outline-none"
                value={content}
                onFocus={() => compact && setCompact(false)}
                onChange={(e) => setContent(e.target.value)}
                onBlur={() => onInputBlur?.()}
              />
              {images?.length > 0 && (
                <div className="w-full relative h-80 mb-4">
                  {images.map((image, i) => (
                    <>
                      <button
                        onClick={() => setImages([])}
                        className="absolute z-[1] bg-slate-700 p-1 text-white top-2 left-2 rounded-full"
                        title="Remove"
                      >
                        <MdOutlineCancel className="w-5 h-5" />
                      </button>
                      <Image
                        key="i"
                        fill={true}
                        style={{ objectFit: "cover" }}
                        className="rounded-2xl"
                        src={URL.createObjectURL(image)}
                        alt={`Tweet media ${i}`}
                      />
                    </>
                  ))}
                </div>
              )}

              <input
                ref={fileRef as any}
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => onImageChange(e.target.files)}
              />
            </div>
          </form>
          <div className="flex justify-between items-center">
            {!compact && (
              <div className="flex items-center gap-x-4">
                <button onClick={chooseFile} className="relative">
                  <div className="absolute m-[-8px] rounded-full hover:bg-[#18a6f920] left-0 right-0 top-0 bottom-0"></div>
                  <RiImage2Line className="w-5 h-5 text-[#1d9bf0]" />
                  <span className="sr-only">Image</span>
                </button>
                <button onClick={noFeature} className="relative text-slate-400">
                  <div className="absolute m-[-8px] rounded-full hover:bg-[#18a6f920] left-0 right-0 top-0 bottom-0"></div>
                  <RiFileGifLine className="w-5 h-5" />
                  <span className="sr-only">Gif</span>
                </button>
                <button onClick={noFeature} className="relative text-slate-400">
                  <div className="absolute m-[-8px] rounded-full hover:bg-[#18a6f920] left-0 right-0 top-0 bottom-0"></div>
                  <RiEmotionLine className="w-5 h-5" />
                  <span className="sr-only">Emoji</span>
                </button>
                <button
                  onClick={noFeature}
                  className="relative text-slate-400"
                  disabled
                >
                  <div className="absolute m-[-8px] rounded-full hover:bg-[#18a6f920] left-0 right-0 top-0 bottom-0"></div>
                  <RiMapPin2Line className="w-5 h-5" />
                  <span className="sr-only">Tag location</span>
                </button>
              </div>
            )}
            <div
              className={`${
                compact
                  ? "absolute flex flex-col justify-center right-0 top-0 bottom-0"
                  : ""
              }`}
            >
              <Button intent={submitReady ? "main" : "disabled"} onClick={handleTweetReplySubmit}>Reply</Button>
            </div>
          </div>
        </div>
        {!compact && (
          <div className="flex gap-x-2 absolute w-full top-[-1rem]">
            <div className="w-12"></div>
            <div className="text-sm text-slate-500">
              Replying to <span className="text-blue-500">@mahi</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TweetReplyForm;
