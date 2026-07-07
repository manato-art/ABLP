export type Pain = {
  id: string;
  shortTitle: string;
  fullTitle: string;
  videoSrc: string;
  posterSrc: string;
  features: PainFeature[];
};

type PainFeature = {
  iconName: string;
  title: string;
  description: string;
};

export type Banner = {
  id: number;
  imageSrc: string;
  alt: string;
  width: number;
  height: number;
  industry?: string;
  size?: string;
  /** 商品/サービス名（例: "化粧水A"） */
  title?: string;
  /** 適用媒体（例: ["Instagram Feed", "Facebook Feed"]） */
  mediaTypes?: string[];
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};


