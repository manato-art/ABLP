"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { FAQ } from "@/types";

type Props = { faq: FAQ; loopTo?: string; painItemId?: string };

export function FAQItem({ faq, loopTo, painItemId }: Props) {
  const [open, setOpen] = useState(false);

  const isNav = !!(loopTo || painItemId);

  const handleClick = () => {
    if (painItemId) {
      document.dispatchEvent(new CustomEvent("pain:select", { detail: { id: painItemId } }));
      document.getElementById("pain")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (loopTo) {
      document.getElementById(loopTo)?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={isNav ? undefined : open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[15px] font-medium text-white">{faq.question}</span>
        <span
          aria-hidden
          className={cn(
            "shrink-0 text-iris-400 transition-transform duration-200 ease-out-expo",
            !isNav && open ? "rotate-45" : "rotate-0",
          )}
        >
          {isNav ? "↑" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && !isNav && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-8 text-[13px] leading-relaxed text-chalk-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
