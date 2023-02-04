import { ReactNode } from "react";

export interface MenuItem {
  href: string;
  text: string;
  width: "full" | "inline" | "mobile";
  size: "small" | "default" | "large";
  icon?: ReactNode;
  click?: () => void;
  variant?: "danger" | "info";
}
