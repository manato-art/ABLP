"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// TODO: 本番の冒頭CM動画に差し替え現状は手持ちのサンプル(cockpit.mp4)を仮使用
const INTRO_SRC = "/videos/cockpit.mp4";
const FADE_MS = 900;

export function IntroVideo() {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  // スキップは原則使わせたくないので2秒後に薄く「もわっと」フェードインさせる
  const [showSkip, setShowSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // フェードアウトしてからアンマウント（動画終了・スキップ共通）
  const close = useCallback(() => {
    setClosing((c) => {
      if (c) return c;
      videoRef.current?.pause();
      timerRef.current = window.setTimeout(() => setOpen(false), FADE_MS);
      return true;
    });
  }, []);

  // オーバーレイ表示中は背面のスクロールをロック
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  // 表示から約2秒後にスキップボタンをフェードイン
  useEffect(() => {
    const t = window.setTimeout(() => setShowSkip(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-ink-950",
        "transition-[opacity,transform] ease-out motion-reduce:transition-none",
        closing ? "pointer-events-none scale-[1.03] opacity-0" : "scale-100 opacity-100",
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      role="dialog"
      aria-label="冒頭ムービー"
    >
      <video
        ref={videoRef}
        src={INTRO_SRC}
        poster="/images/poster-cockpit.jpg"
        autoPlay
        muted
        playsInline
        onEnded={close}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={close}
        aria-hidden={!showSkip}
        tabIndex={showSkip ? 0 : -1}
        className={cn(
          "absolute right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] rounded-full bg-ink-900/70 px-5 py-2 text-[13px] font-semibold text-white ring-1 ring-white/20 backdrop-blur md:right-6 md:bottom-6",
          "transition-opacity ease-out motion-reduce:transition-none hover:bg-ink-900",
          showSkip ? "opacity-60 hover:opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transitionDuration: "1400ms" }}
      >
        スキップ →
      </button>
    </div>
  );
}
