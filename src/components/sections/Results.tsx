import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const RESULT_CARDS = [
  {
    src: "/images/result-card-1.webp",
    alt: "個人利用 - 未経験者が初月から粗利100万円",
  },
  {
    src: "/images/result-card-2.webp",
    alt: "個人利用 - 未経験者が半年で粗利700万円",
  },
  {
    src: "/images/result-card-3.webp",
    alt: "法人様利用 - 半年で売上4,000万円",
  },
];

export function Results() {
  return (
    <section id="features" className="page-frame snap-split relative overflow-hidden py-6 md:py-[clamp(12px,4dvh,48px)]">
      {/* ---- Desktop: single page ---- */}
      <div className="hidden md:block">
        <Reveal>
          <div className="mx-auto max-w-narrow px-6 text-center">
            <h2 className="text-section font-extrabold text-white">
              成果で証明する<span className="whitespace-nowrap"><span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>{" "}Creative</span>の
              <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                実力
              </span>
              
            </h2>
            <p className="mt-2 text-[14px] leading-[1.8] text-chalk-soft md:text-[15px]">
              多くの企業・個人の成長を支援し確かな成果を生み出してきました
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-2 flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-12 bg-iris-500/40" />
            <span className="text-[14px] font-semibold tracking-[0.18em] text-iris-300 md:text-[15px]">
              広告運用の実績
            </span>
            <span aria-hidden className="h-px w-12 bg-iris-500/40" />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-3 grid grid-cols-3 px-[clamp(2rem,4vw,5rem)]">
            {RESULT_CARDS.map((card) => (
              <div
                key={card.src}
                className="relative w-full"
                style={{ aspectRatio: "1127 / 1396" }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="34vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-2 text-center text-[13px] leading-[1.8] text-chalk-soft">
            これからも成果にこだわりクライアントの成長を支援し続けます
          </p>
        </Reveal>
      </div>

      {/* ---- Mobile: title+first card as 1 snap, then remaining cards ---- */}
      <div className="snap-item px-6 md:hidden">
        <div className="mx-auto w-full max-w-container">
          <Reveal>
            <div className="mx-auto max-w-narrow text-center">
              <h2 className="text-[clamp(1.4rem,5vw,1.8rem)] font-extrabold leading-[1.3] text-white">
                成果で証明する<span className="whitespace-nowrap"><span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}>AB</span>{" "}Creative</span>の
                <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                  実力
                </span>
                
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mx-auto mt-2 flex items-center justify-center gap-4">
              <span aria-hidden className="h-px w-12 bg-iris-500/40" />
              <span className="text-[13px] font-semibold tracking-[0.18em] text-iris-300">
                広告運用の実績
              </span>
              <span aria-hidden className="h-px w-12 bg-iris-500/40" />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div
              className="relative mx-auto mt-2 w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "1127 / 1396", maxHeight: "62dvh" }}
            >
              <Image
                src={RESULT_CARDS[0].src}
                alt={RESULT_CARDS[0].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {RESULT_CARDS.slice(1).map((card, i) => (
        <div key={card.src} className="snap-item px-6 md:hidden">
          <div className="mx-auto w-full max-w-container">
            <div
              className="relative mx-auto w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "1127 / 1396", maxHeight: "80dvh" }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {i === RESULT_CARDS.slice(1).length - 1 && (
              <p className="mt-4 text-center text-[13px] leading-[1.8] text-chalk-soft">
                これからも成果にこだわりクライアントの成長を支援し続けます
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
