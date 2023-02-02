import { cva } from "class-variance-authority";
import Link from "next/link";
import { ComponentPropsWithRef, forwardRef } from "react";
import cx from "classnames";

type ButtonProps = (
  | ComponentPropsWithRef<"button">
  | ComponentPropsWithRef<"a">
) & {
  className?: string;
  intent?: "primary" | "main" | "outline" | "disabled";
  size?: "default" | "small" | "large";
  center?: boolean;
  href?: string;
  disabled?: boolean;
};

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

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { children, intent, size, center, href, disabled, className, ...props },
    ref
  ) {
    if (href) {
      return (
        <Link
          href={href}
          className={ButtonStyles({ intent, size, center })}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cx(ButtonStyles({ intent, size, center }), className)}
        disabled={disabled}
        {...(props as any)}
      >
        {children}
      </button>
    );
  }
);

export default Button;
