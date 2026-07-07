"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

export function Cockpit() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.load();
            node.play().catch(() => {});
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cockpit" className="page-frame relative overflow-hidden py-8 md:py-[clamp(14px,4.4dvh,40px)]">
      <div className="mx-auto max-w-container px-6">
        <Reveal>
          <div className="mx-auto max-w-narrow text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-iris-400">
              連携ツール: Cockpit
            </p>
            <h2 className="text-section font-extrabold text-white">
              <span className="block md:hidden"><span className="whitespace-nowrap"><span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>{" "}Creative</span>で作った</span>
              <span className="block md:hidden">クリエイティブを</span>
              <span className="hidden md:block"><span className="whitespace-nowrap"><span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>{" "}Creative</span>で作ったクリエイティブを</span>
              <span className="block">そのまま運用分析へ</span>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.95] text-chalk-soft md:text-[16px]">
              Cockpitは <span className="whitespace-nowrap"><span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>{" "}Creative</span> 制作物のクリエイティブ単位での精査を可能にする運用分析ツール
              <br />
              制作からCV分析まで一画面で完結します
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="-mx-6 mt-6 w-[calc(100%+48px)] overflow-hidden border-y border-white/[0.08] bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] md:mx-auto md:mt-[clamp(10px,2.7dvh,24px)] md:w-full md:max-w-[clamp(768px,82vw,1120px)] md:max-h-[clamp(260px,62dvh,620px)] md:rounded-2xl md:border"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              ref={videoRef}
              src="/videos/cockpit.mp4"
              poster="/images/poster-cockpit.jpg"
              preload="none"
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
