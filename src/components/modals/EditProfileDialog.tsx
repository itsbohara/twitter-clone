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
import { RiEditCircleLine } from "react-icons/ri";

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

  const dispath = useAppDispatch();

  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  async function handleSave() {
    // e.preventDefault();
    // check for profile to upload
    let profileImage;
    if (profile) {
      const body = new FormData();
      body.append("file", profile);
      const uploadedImage = await http.put("/tweet/media", body);
      // profileImage = uploadedImage.data?.path; // TODO : media id
      profileImage = uploadedImage.data?.path;
    }
    await http.patch("/account/me", {
      name,
      bio,
      location,
      url,
      profile: profileImage ?? user?.profile,
    });
    await fetchCurrentUser();
    dispath(setNotice({ message: "Profile updated" }));
    setOpen(false);
  }

  const handleProfileChoose = () => fileRef.current?.click();

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
            <div className="md rounded-full relative avatar border-4 border-white mb-4 flex items-center justify-center">
              <ProfileAvatar
                src={profile ? URL.createObjectURL(profile) : user?.profile}
                alt={user?.name}
                initials={getNameInitials(user?.name)}
              />
              <div className="absolute bottom-2">
                <button
                  onClick={handleProfileChoose}
                  type="button"
                  className="absolute z-10 rounded-full m-[-8px] bg-[#0f141910] hover:bg-[#0f141960] top-0 bottom-0 left-0 right-0"
                ></button>
                <RiEditCircleLine className="relative w-6 h-6 text-white" />
              </div>
              <input
                ref={fileRef as any}
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfile(e.target.files![0])}
              />
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
