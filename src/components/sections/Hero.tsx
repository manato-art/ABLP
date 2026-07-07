import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/Reveal";
import { CTA_URL, DOCS_REQUEST_URL } from "@/lib/nav";

export function Hero() {
  return (
    <section
      id="hero"
      className="page-frame relative isolate overflow-hidden pt-20 pb-6 desktop:flex desktop:min-h-[100dvh] desktop:items-center desktop:py-[clamp(16px,7dvh,64px)]"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="absolute left-[8%] top-[12%] -z-20 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(107,70,255,0.22), transparent 65%)" }}
      />

      {/* Tablet/Desktop (md+): diagonal-split human visual (男性=左 / 女性=右) on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] desktop:block"
      >
        {/* 左: 男性 */}
        <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}>
          <Image
            src="/images/hero-man-v2.webp"
            alt=""
            fill
            sizes="30vw"
            className="object-cover"
            priority
          />
        </div>
        {/* 右: 女性 */}
        <div className="absolute inset-0" style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}>
          <Image
            src="/images/hero-woman-v2.webp"
            alt=""
            fill
            sizes="30vw"
            className="object-cover"
            priority
          />
        </div>
        {/* 四辺フェード（背景へ溶け込ませる） */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #070710 0%, rgba(7,7,16,0.45) 12%, rgba(7,7,16,0) 32%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #070710 0%, rgba(7,7,16,0) 18%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #070710 0%, rgba(7,7,16,0) 22%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to left, #070710 0%, rgba(7,7,16,0) 16%)" }}
        />
      </div>

      <div className="mx-auto w-full max-w-container px-6">
        <div className="flex flex-col items-center text-center desktop:items-start desktop:text-left">
          <div className="desktop:max-w-[46%]">
            <Reveal delay={80}>
              <h1
                id="hero-heading"
                className="font-extrabold leading-tight text-white"
                style={{ fontSize: "clamp(2rem, 2.6vw + 1rem, 3.5rem)", letterSpacing: "-0.025em" }}
              >
                <span className="block">プロ品質のバナーを</span>
                <span className="mt-1 block">
                  <span className="inline-block bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                    誰でも
                  </span>
                </span>
                <span className="mt-1 block">何百枚でも</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 max-w-[34rem] text-[14px] leading-[1.95] text-chalk-soft desktop:mt-7 desktop:text-[16px]">
                URLを貼るだけで瞬時にバナーを大量生産
                <br />
                スマホ運用でCPAを改善
              </p>
            </Reveal>
          </div>

          {/* Mobile: カード型 v2 + clip-path 合成（デスクトップと同じ画像を使用） */}
          <Reveal delay={200} className="-mx-6 mt-5 w-screen desktop:hidden">
            <div
              className="relative aspect-[2/1] w-full overflow-hidden ring-1 ring-white/10"
              style={{ boxShadow: "0 0 60px -12px rgba(124,91,255,0.45)" }}
            >
              <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 62% 0, 38% 100%, 0 100%)" }}>
                <Image
                  src="/images/hero-man-v2.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0" style={{ clipPath: "polygon(62% 0, 100% 0, 100% 100%, 38% 100%)" }}>
                <Image
                  src="/images/hero-woman-v2.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={260} className="mt-5 w-full desktop:mt-7">
            <div className="mx-auto flex w-full max-w-[34rem] flex-col gap-3 sm:max-w-[40rem] sm:flex-row sm:justify-center desktop:mx-0 desktop:max-w-[44rem] desktop:justify-start">
              <CTAButton
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="whitespace-nowrap sm:flex-1"
              >
                無料トライアル
              </CTAButton>
              <CTAButton
                href={DOCS_REQUEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="whitespace-nowrap sm:flex-1"
              >
                資料請求・お問い合わせ
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
