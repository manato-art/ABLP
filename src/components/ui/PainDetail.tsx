"use client";

import type { Pain } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

type Props = { pain: Pain };

export function PainDetail({ pain }: Props) {
  const desktopSrc = pain.videoSrc.replace(/\.mp4$/, "-desktop.mp4");

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={pain.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-ink-900 md:aspect-video"
        >
          <video
            poster={pain.posterSrc}
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source media="(min-width: 768px)" src={desktopSrc} type="video/mp4" />
            <source src={pain.videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3">
        {pain.features.map((f) => (
          <div key={f.title} className="flex flex-col gap-1.5 rounded-lg bg-ink-800/40 p-3">
            <span className="text-[12px] font-bold text-iris-400">{f.title}</span>
            <span className="text-[11px] leading-relaxed text-chalk-muted">{f.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
