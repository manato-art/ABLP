"use client";

import { useState } from "react";
import Image from "next/image";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { Modal } from "@/components/ui/Modal";
import { aspectRatioLabel, bannersRowA, bannersRowB } from "@/lib/banners";
import { CTA_URL } from "@/lib/nav";
import type { Banner } from "@/types";

const points = [
  { title: "瞬間生成", description: "1枚あたり20秒で生成" },
  { title: "業種問わず", description: "あらゆる商材に対応" },
  { title: "複数サイズ", description: "媒体別の規格を一括出力" },
  { title: "PDCA高速化", description: "横展開がワンクリック" },
];

export function BannerMarquee() {
  const [active, setActive] = useState<Banner | null>(null);

  return (
    <section id="cases" className="page-frame relative justify-between py-8 md:py-[clamp(10px,2.8dvh,24px)]">
      <div className="mx-auto max-w-container px-6">
        <Reveal>
          <h2 className="text-center text-section font-extrabold text-white">
            <span className="block">一度のアクションで</span>
            <span className="block">
              <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                AI
              </span>
              が大量に生成
            </span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-8 flex flex-col gap-1 md:mt-6">
        <Marquee direction="right" durationSec={60}>
          {bannersRowA.map((b) => (
            <BannerThumb key={b.id} banner={b} onSelect={setActive} />
          ))}
        </Marquee>
        <Marquee direction="left" durationSec={70}>
          {bannersRowB.map((b) => (
            <BannerThumb key={b.id} banner={b} onSelect={setActive} />
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-8 max-w-container px-6 md:mt-8">
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 text-center md:grid-cols-4 md:gap-6">
            {points.map((p) => (
              <li key={p.title} className="flex flex-col items-center gap-1">
                <span className="text-[18px] font-bold text-white md:text-[25px]">{p.title}</span>
                <span className="text-[14px] text-chalk-muted md:text-[16px]">{p.description}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 flex justify-center md:mt-8">
            <CTAButton
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="px-16 md:px-20"
            >
              無料で試す
            </CTAButton>
          </div>
        </Reveal>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        labelledBy="banner-modal-title"
      >
        {active && (
          <div className="flex max-h-[calc(100dvh-48px)] flex-col overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-white/10">
            <div
              className="relative min-h-0 w-full flex-1 bg-ink-950"
              style={{ aspectRatio: `${active.width} / ${active.height}` }}
            >
              <Image
                src={active.imageSrc}
                alt={active.title ?? active.alt}
                fill
                sizes="(max-width: 768px) 92vw, 460px"
                className="object-contain"
              />
            </div>
            <div className="flex shrink-0 flex-col gap-4 p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3
                  id="banner-modal-title"
                  className="text-[16px] font-bold text-white md:text-[18px]"
                >
                  {active.title ?? active.alt}
                </h3>
                <span className="shrink-0 rounded-full border border-iris-600/40 bg-iris-600/10 px-2.5 py-0.5 font-mono text-[11px] tracking-[0.1em] text-iris-400">
                  {aspectRatioLabel(active.width, active.height)}
                </span>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[12px] leading-relaxed md:text-[13px]">
                <dt className="text-chalk-muted">画像サイズ</dt>
                <dd className="font-mono text-chalk-soft">
                  {active.width}×{active.height}px
                </dd>
                <dt className="text-chalk-muted">適用媒体</dt>
                <dd className="text-chalk-soft">
                  {active.mediaTypes?.join(" / ") ?? "汎用バナー"}
                </dd>
              </dl>
              <CTAButton
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                fullWidth
              >
                このスタイルで試す
              </CTAButton>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function BannerThumb({
  banner,
  onSelect,
}: {
  banner: Banner;
  onSelect: (b: Banner) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(banner)}
      aria-label={`${banner.alt}を拡大表示`}
      style={{ aspectRatio: `${banner.width} / ${banner.height}` }}
      className="group relative h-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 transition-[transform,box-shadow,filter] duration-300 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris-500 md:h-[clamp(84px,17dvh,144px)] hover:z-30 hover:scale-[1.10] hover:shadow-[0_24px_48px_-14px_rgba(124,91,255,0.5),0_0_0_1px_rgba(124,91,255,0.4)]"
    >
      <Image
        src={banner.imageSrc}
        alt={banner.alt}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 30vw, 220px"
        className="object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </button>
  );
}
