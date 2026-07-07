import { faqs } from "@/lib/faq";

const SITE_URL = "https://ab-creative.cypherone.co.jp";
const APP_URL = "https://ab.cypherone.co.jp";

/* ================================================================
   Video metadata
   ================================================================ */

type VideoMeta = {
  name: string;
  description: string;
  duration: string;
  thumbnail: string;
  video: string;
};

const PAIN_VIDEOS: VideoMeta[] = [
  {
    name: "複数サイズの一括生成 — AB Creative",
    description:
      "元CRの訴求や雰囲気を保ったまま複数サイズへ一気に展開Meta・X・Yahoo/LINEなどあらゆる媒体に一瞬で最適化しカスタムサイズにも対応します",
    duration: "PT11S",
    thumbnail: "poster-pain-01.jpg",
    video: "pain-01.mp4",
  },
  {
    name: "ワンストップAI編集 — AB Creative",
    description:
      "気になる箇所を囲って指示するだけで商品差し替え・人物変更・テキスト削除などをAIがピンポイントで編集難しいプロンプト制御なしに直感的に操作できます",
    duration: "PT10S",
    thumbnail: "poster-pain-02.jpg",
    video: "pain-02.mp4",
  },
  {
    name: "AIによる訴求アイデア自動提案 — AB Creative",
    description:
      "LPサイトの訴求を拾い上げ訴求軸ごとに効果的なコピーを提案キーワード抽出やLPにない新しいアプローチの発見までAIがサポートします",
    duration: "PT17S",
    thumbnail: "poster-pain-03.jpg",
    video: "pain-03.mp4",
  },
  {
    name: "素材入力からの効率的バナー生成 — AB Creative",
    description:
      "商品画像・参考バナー・URLを入れるだけでAIが配置・構図・配色を自動作成熟練者向けにスタイルや訴求を細かく指定するプロ設定も用意しています",
    duration: "PT11S",
    thumbnail: "poster-pain-04.jpg",
    video: "pain-04.mp4",
  },
  {
    name: "記事URLからのCR自動生成 — AB Creative",
    description:
      "URLを入れるだけでAIが商品名やジャンルを抽出し理想のターゲティングを自動設定訴求やコピーの壁打ち相手にもなり画像内の文字も認識してバナーを自動生成します",
    duration: "PT13S",
    thumbnail: "poster-pain-05.jpg",
    video: "pain-05.mp4",
  },
  {
    name: "イメージ選択でバナー生成 — AB Creative",
    description:
      "サンプルからイメージに合うものを選ぶだけでバナーを生成プロンプトや専門的なデザイン知識は一切不要で直感的に操作できます",
    duration: "PT10S",
    thumbnail: "poster-pain-06.jpg",
    video: "pain-06.mp4",
  },
  {
    name: "効率的なバナー横展開 — AB Creative",
    description:
      "変えたいところだけ選択しワンアクションで複数枚を生成色・構成・フォント・人物など細かく指定できテキストでAIに直接指示を送ることも可能です",
    duration: "PT8S",
    thumbnail: "poster-pain-07.jpg",
    video: "pain-07.mp4",
  },
];

const COCKPIT_VIDEO: VideoMeta = {
  name: "Cockpit — クリエイティブ運用分析ツール | AB Creative",
  description:
    "AB Creativeで制作したバナーをクリエイティブ単位で精査できる運用分析ツール制作からCV分析まで一画面で完結します",
  duration: "PT15S",
  thumbnail: "poster-cockpit.jpg",
  video: "cockpit.mp4",
};

/* ================================================================
   Schema generators
   ================================================================ */

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cypher One",
    url: "https://cypherone.co.jp",
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@cypherone.co.jp",
      contactType: "customer support",
      availableLanguage: "Japanese",
    },
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AB Creative",
    url: SITE_URL,
    description:
      "AB Creativeは商品URLから広告バナーをAIで自動生成するプラットフォームですMeta・LINE・TikTok・GDN・YouTube・Xなど媒体別の複数サイズを一括出力し広告運用者のクリエイティブ制作を効率化します",
    publisher: { "@type": "Organization", name: "Cypher One" },
  };
}

function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: SITE_URL,
      },
    ],
  };
}

function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, i) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
        ...(i < PAIN_VIDEOS.length
          ? {
              associatedMedia: {
                "@type": "VideoObject",
                name: PAIN_VIDEOS[i].name,
                description: PAIN_VIDEOS[i].description,
                contentUrl: `${SITE_URL}/videos/${PAIN_VIDEOS[i].video}`,
                thumbnailUrl: `${SITE_URL}/images/${PAIN_VIDEOS[i].thumbnail}`,
                duration: PAIN_VIDEOS[i].duration,
              },
            }
          : {}),
      },
    })),
  };
}

function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AB Creative",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: APP_URL,
    description:
      "AB Creativeは商品URLから広告バナーをAIで自動生成するプラットフォームですMeta・LINE・TikTok・GDN・YouTube・Xなど媒体別の複数サイズを一括出力し広告運用者のクリエイティブ制作を効率化します",
    offers: [
      {
        "@type": "Offer",
        name: "無料トライアル",
        price: "0",
        priceCurrency: "JPY",
        description: "7日間の無料トライアル期間中の解約で料金は発生しません",
        eligibleDuration: { "@type": "QuantitativeValue", value: 7, unitCode: "DAY" },
      },
      {
        "@type": "Offer",
        name: "HUSTLE",
        price: "9800",
        priceCurrency: "JPY",
        description: "月150枚生成1枚あたり¥65.390日履歴保存",
      },
      {
        "@type": "Offer",
        name: "FLEX",
        price: "50000",
        priceCurrency: "JPY",
        description:
          "月1,000枚生成1枚あたり¥50.01年履歴保存ABプロ参加券・案件共有・Cockpit席1席付き",
      },
      {
        "@type": "Offer",
        name: "GOAT",
        price: "120000",
        priceCurrency: "JPY",
        description:
          "月3,000枚生成1枚あたり¥40.0無期限履歴保存優先生成複数アカウント同接対面サポートあり",
      },
    ],
    publisher: { "@type": "Organization", name: "Cypher One" },
  };
}

function videoObjectSchemas() {
  const allVideos = [...PAIN_VIDEOS, COCKPIT_VIDEO];
  return allVideos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: `${SITE_URL}/images/${v.thumbnail}`,
    contentUrl: `${SITE_URL}/videos/${v.video}`,
    duration: v.duration,
    uploadDate: "2025-04-01",
    inLanguage: "ja",
    publisher: { "@type": "Organization", name: "Cypher One" },
  }));
}

/* ================================================================
   Component
   ================================================================ */

export function StructuredData() {
  const schemas = [
    organizationSchema(),
    webSiteSchema(),
    breadcrumbSchema(),
    faqPageSchema(),
    softwareApplicationSchema(),
    ...videoObjectSchemas(),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
