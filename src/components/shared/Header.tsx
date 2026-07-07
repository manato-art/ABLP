"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";
import { CTA_URL, DOCS_REQUEST_URL } from "@/lib/nav";
import { cn } from "@/lib/cn";

const sections = [
  { href: "#cases", label: "事例" },
  { href: "#pain", label: "課題" },
  { href: "#cockpit", label: "仕組み" },
  { href: "#features", label: "機能" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out-expo",
        scrolled || menuOpen
          ? "border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Top scrim: keeps nav/CTA legible over hero imagery before scroll. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink-950/85 via-ink-950/35 to-transparent transition-opacity duration-300",
          scrolled || menuOpen ? "opacity-0" : "opacity-100",
        )}
      />

      <div className="container-x flex h-14 items-center justify-between md:h-16">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-white"
          aria-label="AB Creative ホーム"
        >
          <Image
            src="/images/logo.png"
            alt="AB Creative"
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg"
          />
          <span className="text-[15px] font-semibold tracking-tight md:text-[16px]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6B8AFF 0%, #89C4FF 100%)" }}
            >
              AB
            </span>
            {" "}Creative
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="メインナビゲーション">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-[13px] font-medium text-chalk-muted transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <CTAButton href={DOCS_REQUEST_URL} variant="ghost" size="md">
            お問い合わせ
          </CTAButton>
          <CTAButton
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
          >
            無料トライアル
          </CTAButton>
        </div>

        {/* mobile: CTA + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <CTAButton
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="!h-9 !px-4 !text-[13px]"
          >
            無料で試す
          </CTAButton>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-white ring-1 ring-white/15 transition hover:bg-white/5"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-14 -z-10 cursor-default bg-ink-950/60 md:hidden"
            />
            <motion.nav
              id="mobile-menu"
              aria-label="モバイルナビゲーション"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-b border-white/[0.06] bg-ink-950/95 backdrop-blur-xl md:hidden"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                {sections.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-center text-[15px] font-medium text-chalk-soft transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2.5">
                  <CTAButton
                    href={DOCS_REQUEST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => setMenuOpen(false)}
                  >
                    資料請求・お問い合わせ
                  </CTAButton>
                  <CTAButton
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => setMenuOpen(false)}
                  >
                    無料トライアル
                  </CTAButton>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
          open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0.5",
        )}
      />
    </span>
  );
}

