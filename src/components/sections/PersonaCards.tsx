import { Reveal } from "@/components/Reveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { CTA_URL } from "@/lib/nav";

/* ================================================================
   SVG Icons
   ================================================================ */

function IconTarget({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconCart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="21" r="1" fill="currentColor" />
      <circle cx="20" cy="21" r="1" fill="currentColor" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function IconPeople({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconRocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    </svg>
  );
}

function IconImage({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function IconGrad({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconBulb({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21h6M12 3a7 7 0 00-4 12.7V17h8v-1.3A7 7 0 0012 3z" />
    </svg>
  );
}

function IconRefresh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

/* ================================================================
   Theme
   ================================================================ */

type Theme = {
  badgeClass: string;
  borderClass: string;
  accentClass: string;
  iconGradient: string;
  featureIconBg: string;
  featureIconBorder: string;
  footerBg: string;
  footerBorder: string;
};

const THEMES: Record<string, Theme> = {
  purple: {
    badgeClass: "bg-iris-600",
    borderClass: "border-iris-600/30",
    accentClass: "text-iris-400",
    iconGradient: "linear-gradient(135deg, #6B46FF, #9D7BFF)",
    featureIconBg: "rgba(107, 70, 255, 0.12)",
    featureIconBorder: "rgba(157, 123, 255, 0.25)",
    footerBg: "linear-gradient(135deg, rgba(107,70,255,0.25), rgba(168,85,247,0.15))",
    footerBorder: "rgba(107, 70, 255, 0.3)",
  },
  green: {
    badgeClass: "bg-emerald-600",
    borderClass: "border-emerald-500/30",
    accentClass: "text-emerald-400",
    iconGradient: "linear-gradient(135deg, #059669, #34D399)",
    featureIconBg: "rgba(16, 185, 129, 0.12)",
    featureIconBorder: "rgba(52, 211, 153, 0.25)",
    footerBg: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.15))",
    footerBorder: "rgba(16, 185, 129, 0.3)",
  },
  blue: {
    badgeClass: "bg-blue-600",
    borderClass: "border-blue-500/30",
    accentClass: "text-blue-400",
    iconGradient: "linear-gradient(135deg, #2563EB, #60A5FA)",
    featureIconBg: "rgba(59, 130, 246, 0.12)",
    featureIconBorder: "rgba(96, 165, 250, 0.25)",
    footerBg: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15))",
    footerBorder: "rgba(59, 130, 246, 0.3)",
  },
};

/* ================================================================
   Data
   ================================================================ */

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  highlight: string;
};

type PersonaData = {
  theme: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  titleLine1: string;
  titleHighlight: string;
  features: Feature[];
  footerIcon: React.ComponentType<{ className?: string }>;
  footerText: string;
};

const PERSONAS: PersonaData[] = [
  {
    theme: "purple",
    badge: "広告代理店のあなたへ",
    icon: IconTarget,
    titleLine1: "勝てる案件を",
    titleHighlight: "見極める",
    features: [
      { icon: IconPeople, text: "ペルソナ一致を", highlight: "瞬時に判定" },
      { icon: IconDoc, text: "URLで案件を", highlight: "即分析" },
      { icon: IconRocket, text: "案件選定から", highlight: "運用まで一気通貫" },
    ],
    footerIcon: IconChart,
    footerText: "受注率と利益を最大化",
  },
  {
    theme: "green",
    badge: "EC事業者のあなたへ",
    icon: IconCart,
    titleLine1: "売れる伝え方を",
    titleHighlight: "見つける",
    features: [
      { icon: IconImage, text: "訴求パターンを", highlight: "大量生成" },
      { icon: IconGrad, text: "静止画で価値を", highlight: "ユーザー教育" },
      { icon: IconHeart, text: "LTV向上で", highlight: "ファンを増やす" },
    ],
    footerIcon: IconChart,
    footerText: "売上とLTVを最大化",
  },
  {
    theme: "blue",
    badge: "広告運用者のあなたへ",
    icon: IconPhone,
    titleLine1: "CPA改善を",
    titleHighlight: "もっと速く",
    features: [
      { icon: IconClock, text: "スマホで運用を", highlight: "いつでも管理" },
      { icon: IconBulb, text: "改善案を", highlight: "即生成" },
      { icon: IconRefresh, text: "PDCAを高速で", highlight: "回す" },
    ],
    footerIcon: IconBolt,
    footerText: "CPAとROASを最大化",
  },
];

/* ================================================================
   PersonaCard
   ================================================================ */

function PersonaCard({ persona }: { persona: PersonaData }) {
  const t = THEMES[persona.theme];
  const MainIcon = persona.icon;
  const FooterIcon = persona.footerIcon;

  return (
    <div className="relative pt-4">
      {/* Badge */}
      <div className="absolute left-5 top-0 z-10">
        <span
          className={`inline-block rounded-full ${t.badgeClass} px-4 py-1.5 text-[11px] font-bold tracking-wider text-white md:text-[12px]`}
        >
          {persona.badge}
        </span>
      </div>

      {/* Card */}
      <div className={`overflow-hidden rounded-2xl border ${t.borderClass} bg-ink-800/60`}>
        {/* Icon + Title */}
        <div className="flex items-center gap-4 px-5 pb-4 pt-10 md:px-6">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white md:h-16 md:w-16"
            style={{ background: t.iconGradient }}
          >
            <MainIcon className="h-7 w-7 md:h-8 md:w-8" />
          </div>
          <h3 className="text-[20px] font-extrabold leading-tight text-white md:text-[24px]">
            <span className="block">{persona.titleLine1}</span>
            <span className={`block ${t.accentClass}`}>{persona.titleHighlight}</span>
          </h3>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 px-4 py-4 md:px-5 md:py-6">
          {persona.features.map((f) => {
            const FIcon = f.icon;
            return (
              <div key={f.highlight} className="flex flex-col items-center text-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white md:h-11 md:w-11"
                  style={{
                    background: t.featureIconBg,
                    border: `1px solid ${t.featureIconBorder}`,
                  }}
                >
                  <FIcon className="h-5 w-5" />
                </div>
                <span className="mt-2 text-[10px] leading-snug text-chalk-soft md:text-[12px]">
                  {f.text}
                </span>
                <span className={`text-[10px] font-bold leading-snug md:text-[12px] ${t.accentClass}`}>
                  {f.highlight}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-center gap-2 px-5 py-3"
          style={{
            background: t.footerBg,
            borderTop: `1px solid ${t.footerBorder}`,
          }}
        >
          <FooterIcon className="h-5 w-5 text-white" />
          <span className="text-[13px] font-bold text-white md:text-[14px]">
            {persona.footerText}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Main
   ================================================================ */

export function PersonaCards() {
  return (
    <section id="personas" className="page-frame snap-split relative overflow-hidden py-8 md:py-[clamp(20px,4.8dvh,56px)]">
      {/* ---- Desktop: single page (unchanged) ---- */}
      <div className="mx-auto hidden max-w-container px-6 md:block">
        <Reveal>
          <h2 className="text-center text-[34px] font-extrabold leading-tight text-white md:text-display-xl">
            <span className="block">CPA改善を</span>
            <span className="block">
              <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                もっとシンプルに
              </span>
              
            </span>
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 grid grid-cols-3 gap-5">
            {PERSONAS.map((p) => (
              <PersonaCard key={p.badge} persona={p} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 border-t border-white/[0.08] pt-6 text-center">
            <CTAButton
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="animate-pulse-soft"
            >
              無料トライアル
            </CTAButton>
          </div>
        </Reveal>
      </div>

      {/* ---- Mobile: heading + 3 cards, each a snap item ---- */}
      <div className="snap-item px-6 py-[10dvh] md:hidden">
        <div className="mx-auto max-w-container">
          <Reveal>
            <h2 className="text-center text-[34px] font-extrabold leading-tight text-white">
              <span className="block">CPA改善を</span>
              <span className="block">
                <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                  もっとシンプルに
                </span>
                
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      {PERSONAS.map((p, i) => (
        <div key={p.badge} className="snap-item px-6 py-[10dvh] md:hidden">
          <div className="mx-auto w-full max-w-container">
            <PersonaCard persona={p} />
            {i === PERSONAS.length - 1 && (
              <div className="mt-8 border-t border-white/[0.08] pt-6 text-center">
                <CTAButton
                  href={CTA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="animate-pulse-soft"
                >
                  無料トライアル
                </CTAButton>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
