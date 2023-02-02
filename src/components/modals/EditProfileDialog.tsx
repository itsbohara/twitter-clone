import * as Dialog from "@radix-ui/react-dialog";
import { HiOutlineXMark, HiOutlinePencil } from "react-icons/hi2";
import Button from "@ui/Button";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import http from "@/client/axios";
import { useAppDispatch } from "../../hooks/useApp";
import { setNotice } from "@/redux/slices/notice";
import ProfileAvatar from "@ui/radix/ProfileAvatar";
import { getNameInitials } from "@/utils/string";
import { BsCamera } from "react-icons/bs";
import Image from "next/image";
import { relativeCDNUrl } from "../../utils/url";

const EditProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const { user, fetchCurrentUser } = useAuth();
  const handleOpenChange = (open) => {
    setOpen(open);
    if (!open) setProfile(null);
  };

  const [name, setName] = useState(user?.name ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [url, setUrl] = useState(user?.url ?? "");
  const [profileUrl, setProfileUrl] = useState(user?.profile);
  const [coverUrl, setCoverUrl] = useState(user?.profileCover);

  const dispath = useAppDispatch();

  const fileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  async function handleSave() {
    // e.preventDefault();
    // check for profile to upload
    let profileImage, profileCover;
    if (profile) {
      const body = new FormData();
      body.append("file", profile);
      const uploadedImage = await http.put("/tweet/media", body);
      // profileImage = uploadedImage.data?.path; // TODO : media id
      profileImage = uploadedImage.data?.path;
    }
    if (cover) {
      const body = new FormData();
      body.append("file", cover);
      const uploadedImage = await http.put("/tweet/media", body);
      profileCover = uploadedImage.data?.path;
    }
    await http.patch("/account/me", {
      name,
      bio,
      location,
      url,
      profile: profileImage ?? user?.profile,
      profileCover: profileCover ?? user?.profileCover,
    });
    await fetchCurrentUser();
    dispath(setNotice({ message: "Profile updated" }));
    setOpen(false);
  }

  const handleProfileChoose = () => fileRef.current?.click();
  const handleCoverChoose = () => coverFileRef.current?.click();

  function onCoverChange(file) {
    setCover(file);
    setCoverUrl(URL.createObjectURL(file));
  }
  function onProfileChange(file) {
    setProfile(file);
    setProfileUrl(URL.createObjectURL(file));
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button intent="outline">
          <span>Edit Profile</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-slate-900/50 fixed inset-0 z-30" />
        <Dialog.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
          <Dialog.Title className="DialogTitle font-semibold flex items-center">
            <Dialog.Close asChild className="mr-5 items-center">
              <button
                className="IconButton hover:bg-slate-200 rounded-full"
                aria-label="Close"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </Dialog.Close>
            <h2 className="text-lg font-semibold flex-1">Edit Profile</h2>
            <Button size="small" onClick={() => handleSave()}>
              <span>Save</span>
            </Button>
          </Dialog.Title>

          <form
            className="flex flex-col gap-y-2 mt-4"
            // onSubmit={handleSave}
            autoComplete="off"
          >
            <div className="h-36 xs:h-44 sm:h-48">
              <div className="w-full h-36 xs:h-44 sm:h-48 absolute left-0 right-0 bg-cover bg-no-repeat bg-center">
                <input
                  ref={coverFileRef as any}
                  type="file"
                  name="cover"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onCoverChange(e.target.files![0])}
                />
                {coverUrl ? (
                  <Image
                    fill={true}
                    style={{ objectFit: "cover" }}
                    src={relativeCDNUrl(coverUrl)}
                    alt={""}
                  />
                ) : (
                  <div className="h-full bg-slate-500 dark:bg-slate-600" />
                )}
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex">
                  <button
                    title="Change Cover"
                    type="button"
                    onClick={handleCoverChoose}
                    className="p-2 z-10 rounded-full bg-[#0f141967] hover:bg-[#526d8844]"
                  >
                    <BsCamera className="relative w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-20 relative">
              <div className="absolute bottom-0 md rounded-full avatar border-4 border-white mb-4 flex items-center justify-center">
                <ProfileAvatar
                  src={profile ? URL.createObjectURL(profile) : user?.profile}
                  alt={user?.name}
                  initials={getNameInitials(user!.name)}
                />
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  flex">
                  <button
                    title="Change Profile"
                    type="button"
                    onClick={handleProfileChoose}
                    className="p-2 z-10 rounded-full bg-[#0f141967] hover:bg-[#526d8844]"
                  >
                    <BsCamera className="relative w-6 h-6 text-white" />
                  </button>
                </div>
                <input
                  ref={fileRef as any}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onProfileChange(e.target.files![0])}
                />
              </div>
            </div>

            <div className="relative z-0 mb-3 w-full group">
              <input
                type="text"
                name="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative mb-3 w-full group">
              <textarea
                name="bio"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <label
                htmlFor="bio"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bio
              </label>
            </div>
            <div className="relative mb-3 w-full group">
              <input
                type="text"
                name="location"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <label
                htmlFor="location"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Location
              </label>
            </div>
            <div className="relative mb-3 w-full group">
              <input
                type="text"
                name="url"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label
                htmlFor="url"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-focus:dark:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Website
              </label>
            </div>
          </form>
        </Dialog.Content>
        {/* <Dialog.Close asChild>
          <button className="Button green">Save changes</button>
        </Dialog.Close> */}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditProfileDialog;
