import { cva } from "class-variance-authority";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href?: string;
  width: "full" | "inline" | "mobile";
  size?: "default" | "small" | "large";
  children: ReactNode;
  button?: boolean;
  onClick?: () => void;
  variant?: "danger" | "info";
}

const NavItemStyles = cva("items-center gap-x-4 text-slate-900 my-1", {
  variants: {
    width: {
      full: "w-full",
      inline: "inline-flex [&_div:first-child]:rounded-full",
      mobile: "inline-flex justify-center xl:justify-start ",
    },
    size: {
      default: "",
      small: "py-0 [&_div:last-child]:text-sm my-0",
      large: "",
    },
    variant: {
      danger: "danger text-red-500",
      info: "",
    },
  },
  defaultVariants: {
    width: "inline",
    size: "default",
  },
});

const NavItem = ({
  href,
  children,
  width,
  size = 'default',
  button,
  onClick,
  variant,
}: Props) => {
  if (button) {
    return (
      <div className={NavItemStyles({ width, size, variant })}>
        <button
          className="flex rounded-full items-center flex-row gap-x-4 px-4 py-3 hover:bg-slate-100 cursor-pointer"
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  }
  return (
    <Link className={NavItemStyles({ width, size, variant })} href={href ?? '#/'} onClick={onClick}>
      <div className="flex items-center flex-row gap-x-4 px-4 py-3 hover:bg-slate-100">
        {children}
      </div>
    </Link>
  );
};

export default NavItem;
