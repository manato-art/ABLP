"use client";

import { useEffect, useRef, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CTA_URL, DOCS_REQUEST_URL } from "@/lib/nav";

export function FinalCTA() {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState(0); // 0=非表示, 1=キャプション, 2=タイトル, 3=ボタン

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setPhase(3); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        setTimeout(() => setPhase(1), 200);
        setTimeout(() => setPhase(2), 1000);
        setTimeout(() => setPhase(3), 2200);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="cta-final"
      className="page-frame relative overflow-hidden py-8 md:py-[clamp(20px,4.6dvh,56px)]"
    >
      {/* バックグラウンドグロー — phase 2 で拡大 */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none"
        style={{
          width: "min(800px, 90vw)",
          height: "min(800px, 90vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,70,255,0.45) 0%, rgba(107,70,255,0.12) 40%, transparent 70%)",
          opacity: phase >= 2 ? 1 : 0.3,
          transform: phase >= 2 ? "translate(-50%,-50%) scale(1.15)" : "translate(-50%,-50%) scale(0.7)",
          transition: "opacity 1.8s ease-out, transform 1.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {/* 外側の薄いグロー */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(1200px, 100vw)",
          height: "min(1200px, 100vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(157,123,255,0.12) 0%, transparent 60%)",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 2s ease-out",
        }}
      />

      <div className="mx-auto max-w-container px-6">
        {/* キャプション */}
        <div
          className="text-center"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="text-[16px] font-medium tracking-[0.08em] text-chalk-soft md:text-[20px]">
            まずは気軽に始めてみませんか？
          </span>
        </div>

        {/* メインタイトル — cinematic reveal */}
        <div
          className="mt-4 text-center md:mt-5"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "scale(1) translateY(0)" : "scale(0.92) translateY(24px)",
            transition: "opacity 1.4s cubic-bezier(0.22,1,0.36,1), transform 1.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h2
            className="inline-block animate-text-gleam motion-reduce:animate-none"
            style={{
              backgroundImage: "linear-gradient(120deg, #9D7BFF 0%, #9D7BFF 40%, #FFFFFF 50%, #9D7BFF 60%, #9D7BFF 100%)",
              backgroundSize: "400% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "clamp(2.8rem, 5.5vw + 1rem, 7rem)",
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            24時間スマホ運用
          </h2>
        </div>

        {/* ボタン */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-4 md:mt-12"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <CTAButton
            href={DOCS_REQUEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="min-w-[280px]"
          >
            資料請求・お問い合わせ
          </CTAButton>
          <CTAButton
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="min-w-[280px] animate-pulse-soft"
          >
            無料トライアル
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
