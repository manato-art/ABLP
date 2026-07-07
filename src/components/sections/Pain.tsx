"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PainDetail } from "@/components/ui/PainDetail";
import { PainWheel } from "@/components/ui/PainWheel";
import { Reveal } from "@/components/Reveal";
import { pains } from "@/lib/pains";
import type { Pain as PainItem } from "@/types";

export function Pain() {
  const [selectedId, setSelectedId] = useState(pains[0]?.id ?? "01");
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail.id;
      if (!pains.some((p) => p.id === id)) return;
      setSelectedId(id);
      if (window.innerWidth < 1024) setMobileOpenId(id);
    };
    document.addEventListener("pain:select", handler);
    return () => document.removeEventListener("pain:select", handler);
  }, []);
  const selectedPain = pains.find((p) => p.id === selectedId) ?? pains[0];
  const openPain = pains.find((p) => p.id === mobileOpenId) ?? null;

  return (
    <section id="pain" className="page-frame relative overflow-hidden py-8 md:py-[clamp(14px,4.4dvh,40px)]">
      <div className="mx-auto w-full min-w-0 max-w-container px-6">
        <Reveal>
          <h2 className="text-center text-section font-extrabold text-white">
            <span className="block">運用者の不満から</span>
            <span className="block">
              <span className="whitespace-nowrap">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>
                {" "}Creative
              </span>
              は生まれました
            </span>
          </h2>
        </Reveal>

        {/* Desktop layout */}
        <div className="mt-8 hidden items-center gap-5 lg:mt-[clamp(12px,3dvh,28px)] lg:grid" style={{ gridTemplateColumns: "minmax(0,4fr) minmax(0,6fr)" }}>
          <Reveal>
            <PainWheel pains={pains} selectedId={selectedId} onSelect={setSelectedId} />
          </Reveal>

          <Reveal delay={100}>
            <PainDetail pain={selectedPain} />
          </Reveal>
        </div>

        {/* Mobile layout: tap a row → fullscreen video takeover */}
        <div className="mt-3 flex flex-col gap-1 lg:hidden">
          {pains.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setMobileOpenId(p.id)}
              aria-haspopup="dialog"
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-ink-800/40 px-3.5 py-2.5 text-left transition-colors hover:border-white/15"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[16px] font-bold text-iris-400">{p.id}</span>
                <span className="text-[13px] leading-snug text-chalk-soft">{p.shortTitle}</span>
              </span>
              <span aria-hidden className="text-iris-400">›</span>
            </button>
          ))}
        </div>
      </div>

      <MobilePainOverlay pain={openPain} onClose={() => setMobileOpenId(null)} />
    </section>
  );
}

function MobilePainOverlay({ pain, onClose }: { pain: PainItem | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!pain) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [pain, onClose]);

  // Portal to <body> so the overlay escapes the .page-frame stacking context
  // (which is created by will-change/filter) and can cover header + footer CTA.
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {pain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`${pain.id} ${pain.shortTitle}`}
        >
          {/* title */}
          <div className="flex items-start gap-3 px-5 pb-3 pt-[max(0.9rem,env(safe-area-inset-top))]">
            <span className="font-mono text-[22px] font-bold leading-none text-iris-400">{pain.id}</span>
            <h3 className="text-[16px] font-bold leading-snug text-white">{pain.shortTitle}</h3>
          </div>

          {/* video full-bleed + features overlaid on blur zone */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={onClose}
              aria-label="閉じる"
              className="absolute right-4 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/60 text-[15px] text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-ink-950/80"
            >
              ✕
            </button>
            <video
              src={pain.videoSrc}
              poster={pain.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* features on the faded zone — full width */}
            <div className="absolute inset-x-0 bottom-[32%] z-10 bg-ink-950/85 px-4 py-6 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-2.5">
                {pain.features.map((f) => (
                  <div key={f.title} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold leading-tight text-white">{f.title}</span>
                    <span className="text-[10px] leading-relaxed text-chalk-soft">{f.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
