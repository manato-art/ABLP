"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Pain } from "@/types";

type Props = {
  pains: Pain[];
  selectedId: string;
  onSelect: (id: string) => void;
};

const WHEEL_H = "clamp(260px, 44dvh, 400px)";
const ITEM_H = 80;
const STEP_SIZE = 10;
const MAX_STEPS = 4;
// 選択カードを中央より1段上(カード1枚分)に表示する
const ACTIVE_OFFSET = ITEM_H;
const ACTIVE_SCALE = 1.2;

type ItemTransform = {
  opacity: number;
  tx: number;
};

export function PainWheel({ pains, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stateRef = useRef({ pains, selectedId, onSelect });
  const programmaticRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);
  const [transforms, setTransforms] = useState<ItemTransform[]>(
    () => pains.map(() => ({ opacity: 1, tx: 0 })),
  );
  const [hintOpacity, setHintOpacity] = useState(1);

  useEffect(() => {
    stateRef.current = { pains, selectedId, onSelect };
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const vh = el.clientHeight;
      // 非表示（モバイルでは md:grid 側が display:none）だと clientHeight=0 になり
      // absDist/half が 0/0=NaN → opacity:NaN になるためスキップ
      if (vh === 0) return;
      const center = el.scrollTop + vh / 2 - ACTIVE_OFFSET;
      const half = vh / 2;

      const next: ItemTransform[] = [];
      let minDist = Infinity;
      let activeIdx = 0;

      itemRefs.current.forEach((item, i) => {
        if (!item) {
          next.push({ opacity: 1, tx: 0 });
          return;
        }
        const itemCenter = item.offsetTop + item.offsetHeight / 2;
        const absDist = Math.abs(itemCenter - center);
        const n = Math.min(absDist / half, 1);
        const stepDist = Math.min(absDist / ITEM_H, MAX_STEPS);
        next.push({
          opacity: 1 - n * 0.6,
          tx: STEP_SIZE * stepDist,
        });
        if (absDist < minDist) {
          minDist = absDist;
          activeIdx = i;
        }
      });

      setTransforms(next);

      const max = el.scrollHeight - el.clientHeight;
      const remaining = max - el.scrollTop;
      setHintOpacity(Math.max(0, Math.min(1, remaining / 80)));

      if (!programmaticRef.current) {
        const { pains: ps, selectedId: sel, onSelect: cb } = stateRef.current;
        const target = ps[activeIdx];
        if (target && target.id !== sel) cb(target.id);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(update);

    const ro = new ResizeObserver(() => requestAnimationFrame(update));
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const idx = pains.findIndex((p) => p.id === selectedId);
    if (idx === -1) return;
    const item = itemRefs.current[idx];
    if (!item) return;
    const target = item.offsetTop - el.clientHeight / 2 + item.offsetHeight / 2 + ACTIVE_OFFSET;
    if (Math.abs(el.scrollTop - target) < 2) return;

    programmaticRef.current = true;
    if (programmaticTimerRef.current !== null) {
      window.clearTimeout(programmaticTimerRef.current);
    }
    el.scrollTo({ top: target, behavior: "smooth" });

    const release = () => {
      programmaticRef.current = false;
      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
        programmaticTimerRef.current = null;
      }
      el.removeEventListener("scrollend", release);
    };
    // scrollend でアニメーション完了を検知（Chrome 121+ / Firefox 109+）
    el.addEventListener("scrollend", release, { once: true });
    // フォールバック: scrollend 未対応ブラウザ向けの最大待機タイマー
    programmaticTimerRef.current = window.setTimeout(release, 1200);
  }, [selectedId, pains]);

  // 上下で非対称に：選択カードはコンテナ中央より ACTIVE_OFFSET だけ上に表示されるため
  // 最初/最後のアイテムでも scrollTo target が範囲内に収まるよう上を小さく/下を大きく取る
  const topSpacer = `calc((${WHEEL_H} - ${ITEM_H}px) / 2 - ${ACTIVE_OFFSET}px)`;
  // +ITEM_H で最後のアイテムのスクロールターゲットが maxScroll を下回ることを保証する
  const bottomSpacer = `calc((${WHEEL_H} - ${ITEM_H}px) / 2 + ${ACTIVE_OFFSET}px + ${ITEM_H}px)`;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="pain-wheel relative z-10 overflow-y-auto snap-y snap-mandatory pl-16 pr-12"
        style={{
          height: WHEEL_H,
          scrollbarWidth: "none",
          maskImage:
            "linear-gradient(to bottom, transparent 0, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black 22%, black 78%, transparent 100%)",
        }}
        aria-label="課題リスト"
      >
        <div style={{ height: topSpacer }} aria-hidden />
        {pains.map((p, i) => {
          const t = transforms[i] ?? { opacity: 1, tx: 0 };
          const isActive = p.id === selectedId;
          return (
            <div
              key={p.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="snap-center flex items-center justify-center"
              style={{ height: ITEM_H }}
            >
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                aria-pressed={isActive}
                className={cn(
                  "w-full rounded-2xl border px-5 py-4 text-left will-change-transform",
                  isActive
                    ? "border-iris-500 bg-iris-600/30 text-white shadow-[0_0_0_1px_rgba(124,91,255,0.5),0_16px_36px_-12px_rgba(107,70,255,0.7)]"
                    : "border-white/[0.06] bg-ink-800/50 text-chalk-soft hover:border-white/15",
                )}
                style={{
                  transform: isActive
                    ? `translateX(${t.tx}px) scale(${ACTIVE_SCALE})`
                    : `translateX(${t.tx}px)`,
                  opacity: t.opacity,
                }}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className={cn(
                      "shrink-0 font-mono text-[22px] font-bold leading-none tracking-tight",
                      isActive ? "text-iris-400" : "text-chalk-muted",
                    )}
                  >
                    {p.id}
                  </span>
                  <span className="truncate text-[14px] font-medium leading-snug md:text-[15px]">
                    {p.shortTitle}
                  </span>
                </div>
              </button>
            </div>
          );
        })}
        {/* 最後のアイテムを active 位置（中央より ACTIVE_OFFSET 上）に置くためのスナップ点
            snap-mandatory は「次のアイテムを中央に」という位置でスナップするため
            最後のアイテムの直後にこの幽霊 div を置くことで正しいスナップ点を生成する */}
        <div className="snap-center" style={{ height: ITEM_H }} aria-hidden />
        <div style={{ height: bottomSpacer }} aria-hidden />
      </div>

      <div
        className="mt-3 flex justify-center transition-opacity duration-300"
        style={{ opacity: hintOpacity }}
        aria-hidden
      >
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          className="animate-scroll-hint text-chalk-muted"
        >
          <path
            d="M6 1v12M1.5 8.5l4.5 4.5 4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
