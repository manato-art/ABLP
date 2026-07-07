import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { Starfield } from "@/components/Starfield";
import { inter, notoSansJP } from "./fonts";
import "./globals.css";

const SITE_URL = "https://ab-creative.cypherone.co.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AB Creative — URLを貼るだけ誰でも大量に売れるバナー生成",
    template: "%s | AB Creative",
  },
  description:
    "商品URLから訴求とデザインを生成媒体別の複数サイズを一括出力広告運用者のためのAIクリエイティブ生成プラットフォーム",
  keywords: ["AB Creative", "AI バナー", "広告運用", "クリエイティブ生成", "Cypher One"],
  authors: [{ name: "Cypher One Inc." }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "AB Creative — URLを貼るだけ誰でも大量に売れるバナー生成",
    description: "商品URLから訴求とデザインを生成媒体別の複数サイズを一括出力",
    url: SITE_URL,
    type: "website",
    locale: "ja_JP",
    siteName: "AB Creative",
    images: [
      {
        url: "/images/og-v2.jpg",
        width: 1200,
        height: 630,
        alt: "AB Creative — AIクリエイティブ生成プラットフォーム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AB Creative",
    description: "URLを貼るだけ誰でも大量に売れるバナー生成",
    images: ["/images/og-v2.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="bg-ink-950 text-chalk-soft font-sans antialiased">
        <StructuredData />
        <Starfield />
        {children}
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
