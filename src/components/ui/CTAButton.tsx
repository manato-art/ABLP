"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type AnchorProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type CTAButtonProps = ButtonProps | AnchorProps;

const baseClass =
  "group relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 ease-out-expo will-change-transform select-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[14px] rounded-full md:h-12 md:px-6 md:text-[15px]",
  lg: "h-12 px-6 text-[15px] rounded-full md:h-14 md:px-8 md:text-[17px]",
};

const variants: Record<Variant, string> = {
  primary: cn(
    "text-white",
    "bg-iris-grad",
    "shadow-iris-soft",
    "hover:shadow-iris-strong hover:-translate-y-0.5 active:translate-y-0",
    "after:absolute after:inset-0 after:rounded-full after:bg-iris-grad-hover after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-200 after:-z-0",
    "before:absolute before:inset-px before:rounded-full before:bg-iris-grad before:z-0",
  ),
  secondary: cn(
    "text-white",
    "bg-white/[0.02]",
    "border border-iris-600/50",
    "hover:bg-iris-600/10 hover:border-iris-500",
  ),
  ghost: cn(
    "text-chalk-soft hover:text-white",
    "bg-transparent",
    "hover:bg-white/[0.04]",
  ),
};

export const CTAButton = forwardRef<HTMLElement, CTAButtonProps>(
  function CTAButton(props, ref) {
    const {
      variant = "primary",
      size = "md",
      className,
      children,
      fullWidth,
      ...rest
    } = props as CommonProps & {
      href?: string;
    } & Record<string, unknown>;

    const classes = cn(
      baseClass,
      sizes[size],
      variants[variant],
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {variant === "primary" && (
          <span className="relative z-10 flex items-center gap-2">
            {children}
            <ArrowIcon />
          </span>
        )}
        {variant !== "primary" && (
          <span className="flex items-center gap-2">
            {children}
            <ArrowIcon className="opacity-70 group-hover:opacity-100" />
          </span>
        )}
      </>
    );

    if ("href" in props && props.href) {
      const { href, target, rel, onClick } = props as AnchorProps;
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        "h-3.5 w-3.5 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
