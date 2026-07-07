"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
};

export function Modal({ open, onClose, children, labelledBy, describedBy }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    // Prevent body scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus dialog
    requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
      lastActiveRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <button
        type="button"
        aria-label="モーダルを閉じる"
        className="absolute inset-0 bg-ink-950/90 backdrop-blur-md transition-opacity duration-300 animate-[fade-up_300ms_ease-out_forwards]"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          "relative z-[101] w-[90%] max-h-[calc(100dvh-48px)] max-w-[460px] outline-none",
          "animate-[fade-up_400ms_cubic-bezier(0.16,1,0.3,1)_forwards]",
        )}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/90 text-white ring-1 ring-white/10 transition hover:bg-ink-800 hover:ring-iris-500"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
