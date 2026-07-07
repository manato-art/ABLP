import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        desktop: "1080px",
      },
      colors: {
        // 3-layer dark base
        ink: {
          950: "#04041A", // deepest (FV, FinalCTA)
          900: "#0A0A14", // standard
          800: "#1A1A28", // elevated surfaces
          700: "#252537",
        },
        // Text 3-layer
        chalk: {
          DEFAULT: "#FFFFFF",
          soft: "#E5E5EC",
          muted: "#8B8B9A",
          dim: "#5A5A6A",
        },
        // Brand accent: purple
        iris: {
          400: "#9D7BFF",
          500: "#7C5BFF",
          600: "#6B46FF", // gradient start
          700: "#A855F7", // gradient end
        },
        // Positive signal: cyan
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
        },
        // Scarcity/highlight: amber
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "var(--font-noto-sans-jp)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Hero scales — bigger headroom but with proper clamps that won't overflow Japanese text
        "hero-pc": ["clamp(2.5rem, 2.6vw + 1.4rem, 4.25rem)", { lineHeight: "1.18", letterSpacing: "-0.025em" }],
        "hero-mb": ["clamp(1.9rem, 4.5vw + 0.5rem, 2.5rem)", { lineHeight: "1.22", letterSpacing: "-0.01em" }],
        "section": ["clamp(1.8rem, 2vw + 1rem, 3rem)", { lineHeight: "1.28", letterSpacing: "-0.015em" }],
        "story": ["clamp(1.4rem, 1.2vw + 1rem, 2.25rem)", { lineHeight: "1.85", letterSpacing: "0.01em" }],
        // New: Stripe/Apple-style display sizes
        "display-xl": ["clamp(3rem, 3.5vw + 1.5rem, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        container: "clamp(1200px, 90vw, 1480px)",
        narrow: "clamp(920px, 78vw, 1080px)",
      },
      backgroundImage: {
        "iris-grad": "linear-gradient(135deg, #6B46FF 0%, #A855F7 100%)",
        "iris-grad-hover": "linear-gradient(135deg, #7C5BFF 0%, #B567F8 100%)",
        "iris-glow":
          "radial-gradient(60% 60% at 50% 50%, rgba(107,70,255,0.18) 0%, rgba(107,70,255,0) 70%)",
        "cyan-glow":
          "radial-gradient(60% 60% at 50% 50%, rgba(6,182,212,0.16) 0%, rgba(6,182,212,0) 70%)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        "iris-soft": "0 8px 32px -8px rgba(107, 70, 255, 0.35), 0 0 0 1px rgba(107, 70, 255, 0.18)",
        "iris-strong": "0 16px 48px -12px rgba(107, 70, 255, 0.5), 0 0 0 1px rgba(107, 70, 255, 0.3)",
        "card": "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(124,91,255,0.35), 0 16px 40px -16px rgba(107,70,255,0.25)",
      },
      animation: {
        "marquee-right": "marquee-right 60s linear infinite",
        "marquee-left": "marquee-left 60s linear infinite",
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "text-shimmer": "text-shimmer 6s linear infinite",
        "text-gleam": "text-gleam 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
      },
      keyframes: {
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "text-gleam": {
          "0%": { backgroundPosition: "100% 50%" },
          "45%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", transform: "translate(-50%, -50%) scale(1)" },
          "50%": { opacity: "0.85", transform: "translate(-50%, -50%) scale(1.06)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
