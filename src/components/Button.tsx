import { cva } from "class-variance-authority";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  intent?: "primary" | "main" | "outline" | "disabled";
  size?: "default" | "small" | "large";
  center?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  [key: string]: any;
}

const ButtonStyles = cva(
  "inline-flex items-center font-bold rounded-full border",
  {
    variants: {
      intent: {
        main: "bg-[#1d9bf0] text-white border-transparent",
        primary: "bg-slate-900 text-white border-transparent",
        outline: "bg-transparent text-slate-900 border-slate-200",
        disabled:
          "bg-slate-900 text-white border-transparent opacity-50 cursor-default",
      },
      size: {
        default: "px-4 py-2 text-sm",
        small: "px-4 py-1 text-sm",
        large: "px-3 xl:px-20 py-3 text-lg",
      },
      center: {
        false: "",
        true: "flex flex-col",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
      center: false,
    },
  }
);

const Button = ({
  children,
  intent,
  size,
  center,
  href,
  onClick,
  disabled,
  ...props
}: Props) =>
  href ? (
    <Link href={href} className={ButtonStyles({ intent, size, center })}>
      {children}
    </Link>
  ) : (
    <button
      className={ButtonStyles({ intent, size, center })}
      onClick={onClick!}
      disabled={disabled}
    >
      {children}
    </button>
  );

export default Button;
