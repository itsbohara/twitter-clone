import { SiTwitter } from "react-icons/si";
import Loader from "./Loader";

export default function AppLoading() {
  return (
    <div className="flex flex-col justify-center text-center min-h-screen">
      <SiTwitter className="mx-auto text-[#1da1f2] mb-4 w-12 h-12" />
      <Loader />
    </div>
  );
}
