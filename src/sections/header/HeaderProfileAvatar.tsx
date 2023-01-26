import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Link from "next/link";

const HeaderProfileAvatar = ({
  src,
  alt,
  initials,
  username,
}: {
  src: string;
  alt: string;
  initials: string;
  username: string;
}) => (
  <Link href={`/${username}`}>
    <AvatarPrimitive.Root className="AvatarRoot inline-flex items-center justify-center overflow-hidden w-8 h-8 rounded-full bg-slate-900 mr-4">
      <AvatarPrimitive.Image
        className="AvatarImage w-100 h-100 object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className="AvatarFallback w-100 h-100 flex items-center justify-center text-base text-white leading-none font-semibold"
        delayMs={600}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  </Link>
);

export default HeaderProfileAvatar;
