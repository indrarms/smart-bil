import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2",
        // size
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-5 py-3 text-base": size === "lg",
        },
        // variant
        {
          // 🔹 PRIMARY = DARK NAVY
          "bg-slate-900 text-white hover:bg-slate-950 focus:ring-slate-900":
            variant === "primary",

          // 🔹 SECONDARY
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300":
            variant === "secondary",

          // 🔹 DANGER
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600":
            variant === "danger",
        },
        className
      )}
      {...props}
    />
  );
}
