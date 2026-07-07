"use client";

import { useEffect, useState } from "react";

const SPARK_COUNT_DESKTOP = 32;
const SPARK_COUNT_MOBILE = 14;

export function Starfield() {
  const [reduce, setReduce] = useState(false);
  const [sparkCount, setSparkCount] = useState(SPARK_COUNT_MOBILE);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setSparkCount(window.innerWidth >= 768 ? SPARK_COUNT_DESKTOP : SPARK_COUNT_MOBILE);
  }, []);

  const sparks = Array.from({ length: sparkCount }).map((_, i) => {
    const seed = (i * 1031 + 71) % 1000;
    return {
      x: (seed * 1.17) % 1400,
      y: (seed * 0.83 + i * 73) % 900,
      r: 0.7 + (seed % 5) * 0.5,
      color: ["#A855F7", "#22D3EE", "#7C5BFF", "#FFFFFF"][i % 4],
      delay: (seed % 1000) / 250,
      twinkleDuration: 2 + (seed % 4) * 0.6,
      driftDuration: 12 + (seed % 9),
      drift: 24 + (seed % 36),
    };
  });

  const streaks = [
    { y: 140, delay: 0, totalDuration: 7 },
    { y: 360, delay: 3.5, totalDuration: 9.4 },
    { y: 600, delay: 1.8, totalDuration: 7.8 },
    { y: 780, delay: 6.2, totalDuration: 10.6 },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="streak-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {sparks.map((p, i) =>
          reduce ? (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={p.color}
              opacity={0.45}
            />
          ) : (
            <g
              key={i}
              style={
                {
                  animation: `star-drift ${p.driftDuration}s ease-in-out ${p.delay}s infinite`,
                  "--dx1": `${p.drift}px`,
                  "--dy1": `${-p.drift * 0.8}px`,
                  "--dx2": `${-p.drift * 0.6}px`,
                  "--dy2": `${p.drift * 0.7}px`,
                } as React.CSSProperties
              }
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={p.color}
                style={{
                  animation: `star-twinkle ${p.twinkleDuration}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            </g>
          ),
        )}

        {!reduce &&
          streaks.map((s, i) => (
            <rect
              key={i}
              x={0}
              y={s.y}
              width={180}
              height={1.6}
              fill="url(#streak-grad)"
              rx={0.8}
              style={{
                animation: `star-streak ${s.totalDuration}s ease-out ${s.delay}s infinite`,
              }}
            />
          ))}
      </svg>
    </div>
  );
}
