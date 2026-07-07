"use client";

import { useEffect } from "react";

/**
 * Page-reveal controller.
 *
 * Sets `data-page-state` on every `.page-frame` element on the page:
 *   - removed (=active) for the section currently filling the viewport
 *   - "ahead" for sections below the active one
 *   - "behind" for sections above the active one
 *
 * CSS in globals.css picks up these states to dim/blur inactive sections.
 *
 * Also switches `scroll-snap-type` off on <html> once the outro section
 * (`[data-no-snap]`) enters the viewport, so the user can scroll freely
 * through FinalCTA + Footer without being snap-locked to FAQ.
 */
export function PageRevealController() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".page-frame"),
    );
    if (!sections.length) return;

    // Outro snap toggle: drop the mandatory snap once the user has reached
    // the last snap section (the one immediately before the [data-no-snap]
    // outro). Without this, mandatory snap pulls the user back from any
    // attempt to scroll past it, making the Footer unreachable.
    // Re-engage snap when the user scrolls back well above that boundary.
    const lastSnap = sections[sections.length - 1];
    let snapObserver: IntersectionObserver | null = null;
    if (lastSnap) {
      snapObserver = new IntersectionObserver(
        ([entry]) => {
          const r = entry.boundingClientRect;
          if (entry.intersectionRatio > 0.85 && r.top < 50) {
            document.documentElement.style.scrollSnapType = "none";
          } else if (r.top > 100) {
            document.documentElement.style.scrollSnapType = "";
          }
        },
        { threshold: [0, 0.1, 0.5, 0.85, 1] },
      );
      snapObserver.observe(lastSnap);
    }

    let activeIdx = -1;

    const recompute = () => {
      const vh = window.innerHeight || 1;
      let bestIdx = 0;
      let bestVisible = -1;
      sections.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const top = Math.max(0, r.top);
        const bottom = Math.min(vh, r.bottom);
        const visible = Math.max(0, bottom - top);
        if (visible > bestVisible) {
          bestVisible = visible;
          bestIdx = i;
        }
      });

      // No page-frame is in the viewport (user is below the last section,
      // e.g. in the Footer area). Keep the last known state to avoid
      // incorrectly marking Hero as active.
      if (bestVisible <= 0) return;

      if (bestIdx === activeIdx) return;
      activeIdx = bestIdx;

      sections.forEach((s, i) => {
        if (i === bestIdx) s.removeAttribute("data-page-state");
        else if (i < bestIdx) s.setAttribute("data-page-state", "behind");
        else s.setAttribute("data-page-state", "ahead");
      });
    };

    const observer = new IntersectionObserver(recompute, {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    });
    sections.forEach((s) => observer.observe(s));

    recompute();
    return () => {
      observer.disconnect();
      snapObserver?.disconnect();
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  return null;
}
