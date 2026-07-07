import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 従来の検索エンジン
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "bingbot", allow: "/" },

      // AI検索クローラー（引用トラフィックあり → 許可）
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "MistralAI-User", allow: "/" },

      // AIトレーニング用クローラー（モデル学習目的 → ブロック）
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Meta-ExternalAgent", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },

      // Google/Apple AIトレーニング オプトアウト
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },

      // デフォルト（未知のクローラー含む）
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://ab-creative.cypherone.co.jp/sitemap.xml",
  };
}
