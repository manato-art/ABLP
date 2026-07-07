import Image from "next/image";
import Link from "next/link";
import { DOCS_REQUEST_URL } from "@/lib/nav";

type FooterLink = { href: string; label: string; external?: boolean };

const productLinks: FooterLink[] = [
  // 提供アンカーは #gallery/#solution/#feature だが現状LPの実在IDに紐付ける
  { href: "#cases", label: "生成事例" },
  { href: "#cockpit", label: "仕組み" },
  { href: "#features", label: "機能" },
  { href: "https://ab.cypherone.co.jp/signup/type", label: "アプリを開く", external: true },
];

const companyLinks: FooterLink[] = [
  { href: "#story", label: "私たちの考え" },
  { href: "mailto:info@cypherone.co.jp", label: "お問い合わせ" },
  { href: DOCS_REQUEST_URL, label: "資料ダウンロード", external: true },
  { href: "https://cypherone.co.jp", label: "運営会社", external: true },
];

const policyLinks: FooterLink[] = [
  { href: "/terms.html", label: "利用規約" },
  { href: "/privacy.html", label: "プライバシーポリシー" },
  { href: "https://ab.cypherone.co.jp/policies/tokutei", label: "特定商取引法に基づく表記", external: true },
  { href: "https://ab.cypherone.co.jp/policies/security", label: "セキュリティ", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950 pb-[max(7rem,calc(env(safe-area-inset-bottom)+6rem))] pt-12 md:pb-16 md:pt-16">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-white">
              <Image
                src="/images/logo.png"
                alt="AB Creative"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg"
              />
              <span className="text-[15px] font-semibold tracking-tight">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}
                >
                  AB
                </span>
                {" "}Creative
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-chalk-muted">
              広告運用者のためのAIクリエイティブ生成プラットフォーム
              <br />
              量はAIに質はあなたに
            </p>
            <p className="mt-6 text-[12px] text-chalk-dim">
              © {new Date().getFullYear()} Cypher One.inc
            </p>
          </div>

          <FooterColumn title="プロダクト" links={productLinks} />
          <FooterColumn title="運営" links={companyLinks} />
          <FooterColumn title="ポリシー" links={policyLinks} />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  const linkClass =
    "inline-flex items-center gap-1 text-[13px] text-chalk-soft transition-colors hover:text-white";

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-chalk-muted">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.label}
                <span aria-hidden className="text-[11px] text-chalk-muted">↗</span>
              </a>
            ) : l.href.startsWith("mailto:") ? (
              <a href={l.href} className={linkClass}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
