import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { relativeCDNUrl } from "../../utils/url";

const ProfileAvatar = ({
  src,
  alt,
  initials,
}: {
  src?: string;
  alt?: string;
  initials?: string;
}) => (
  <AvatarPrimitive.Root className="AvatarRoot inline-flex items-center justify-center overflow-hidden w-[130px] h-[130px] rounded-full bg-slate-900">
    <AvatarPrimitive.Image
      className="AvatarImage w-100 h-100 object-cover"
      src={relativeCDNUrl(src!) ?? ''}
      alt={alt}
    />
    <AvatarPrimitive.Fallback
      className="AvatarFallback w-100 h-100 flex items-center justify-center text-base text-white leading-none font-semibold"
      delayMs={600}
    >
      {initials}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
);

export default ProfileAvatar;
