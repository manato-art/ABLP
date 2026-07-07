import type { Banner } from "@/types";

type BannerMeta = {
  width: number;
  height: number;
  title: string;
};

const META: BannerMeta[] = [
  { width: 1254, height: 1254, title: "コンシーラー" }, //  1
  { width: 1254, height: 1254, title: "旅行予約アプリ" }, //  2
  { width: 1254, height: 1254, title: "不動産検索" }, //  3
  { width: 1254, height: 1254, title: "オンライン英会話" }, //  4
  { width: 1080, height: 1080, title: "フードデリバリー" }, //  5
  { width: 1254, height: 1254, title: "不動産査定" }, //  6
  { width: 1254, height: 1254, title: "法律相談" }, //  7
  { width: 1254, height: 1254, title: "保険比較" }, //  8
  { width: 1254, height: 1254, title: "車買取査定" }, //  9
  { width: 1080, height: 1350, title: "空気清浄機" }, // 10
  { width: 1080, height: 1920, title: "家事代行" }, // 11
  { width: 1254, height: 1254, title: "韓国コスメ" }, // 12
  { width: 1920, height: 1080, title: "プロジェクター" }, // 13
  { width: 1200, height:  900, title: "キャンプ用品" }, // 14
  { width:  300, height:  250, title: "マットレストッパー" }, // 15
  { width:  600, height:  400, title: "知育玩具" }, // 16
  { width: 1080, height: 1350, title: "ワイヤレスイヤホン" }, // 17
  { width: 1920, height: 1080, title: "調理器具セット" }, // 18
  { width: 1080, height: 1920, title: "ブライダル" }, // 19
  { width: 1080, height: 1350, title: "ペットフード" }, // 20
  { width: 1080, height: 1920, title: "美容セラム" }, // 21
  { width: 1200, height:  900, title: "清涼飲料水" }, // 22
  { width: 1920, height: 1080, title: "コーヒーマシン" }, // 23
  { width: 1080, height: 1920, title: "サステナブルファッション" }, // 24
  { width: 1200, height:  900, title: "太陽光発電" }, // 25
  { width: 1402, height: 1122, title: "ヨガ教室" }, // 26
  { width: 1254, height: 1254, title: "オンラインフィットネス" }, // 27
  { width: 1254, height: 1254, title: "スペシャルティコーヒー" }, // 28
  { width: 1254, height: 1254, title: "美容クリニック" }, // 29
  { width: 1254, height: 1254, title: "メカニカルキーボード" }, // 30
  { width: 1254, height: 1254, title: "家計管理アプリ" }, // 31
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const RATIO_PRESETS: Array<[number, string]> = [
  [1 / 1, "1:1"],
  [4 / 5, "4:5"],
  [9 / 16, "9:16"],
  [16 / 9, "16:9"],
  [4 / 3, "4:3"],
  [3 / 4, "3:4"],
  [6 / 5, "6:5"],
  [3 / 2, "3:2"],
  [5 / 4, "5:4"],
  [2 / 3, "2:3"],
];

/** width/height からアスペクト比 (例 "1:1", "16:9", "4:5") を返す */
export function aspectRatioLabel(w: number, h: number): string {
  const r = w / h;
  let best = { diff: Infinity, label: "" };
  for (const [target, label] of RATIO_PRESETS) {
    const diff = Math.abs(r - target);
    if (diff < best.diff) best = { diff, label };
  }
  if (best.diff < 0.03) return best.label;
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
}

/** width/height から代表的な広告媒体を返す */
function mediaTypesFor(w: number, h: number): string[] {
  const ratio = aspectRatioLabel(w, h);
  switch (ratio) {
    case "1:1":
      return ["Instagram Feed", "Facebook Feed", "X (Twitter)"];
    case "4:5":
      return ["Instagram Feed (縦)", "Facebook Feed"];
    case "9:16":
      return ["Instagram Reels / Stories", "TikTok", "YouTube Shorts"];
    case "16:9":
      return ["YouTube サムネ", "X (Twitter)", "LinkedIn"];
    case "4:3":
      return ["Google ディスプレイ広告", "Yahoo! 広告"];
    case "6:5":
      return ["Google ディスプレイ広告 (300×250)"];
    case "3:2":
      return ["Google ディスプレイ広告", "汎用バナー"];
    case "5:4":
      return ["Google ディスプレイ広告", "汎用バナー"];
    default:
      return ["汎用バナー"];
  }
}

const banners: Banner[] = META.map((m, i) => {
  const id = i + 1;
  return {
    id,
    imageSrc: `/banners/banner-${String(id).padStart(2, "0")}.jpg`,
    alt: m.title,
    title: m.title,
    width: m.width,
    height: m.height,
    size: `${m.width}×${m.height}`,
    mediaTypes: mediaTypesFor(m.width, m.height),
  };
});

const half = Math.ceil(banners.length / 2);
export const bannersRowA = banners.slice(0, half);
export const bannersRowB = banners.slice(half);
