import type { Pain } from "@/types";

const PAINS_DATA: Array<{
  shortTitle: string;
  features: Array<{ title: string; description: string }>;
}> = [
  {
    shortTitle: "複数サイズを大量に作れない",
    features: [
      { title: "複数サイズを量産", description: "元CRの訴求や雰囲気をそのままに色々なサイズへ一気に展開" },
      { title: "あらゆる媒体へ対応", description: "MetaXDemandYahoo/LINE...etc どの媒体へも一瞬で最適化" },
      { title: "カスタムサイズ", description: "自分で指定したサイズへの展開も可能場所を選ばず配信できるCRへ" },
    ],
  },
  {
    shortTitle: "ツールを行ったり来たりしたくない",
    features: [
      { title: "かこって編集", description: "気になる箇所を囲って指示するだけいちいち他ツールを跨ぐ必要はありません" },
      { title: "自由自在にAI編集", description: "商品差し替え人物変更テキスト削除...ピンポイントでAIが編集しに行きます" },
      { title: "直感的なAI体験", description: "文字で指示するのは最小限でOK難しいプロンプト制御無しにAIを動かせます" },
    ],
  },
  {
    shortTitle: "訴求のアイデアが思いつかない",
    features: [
      { title: "コピー提案", description: "LPサイトの訴求を拾い上げ訴求軸ごとに効果的なコピーを提案します" },
      { title: "キーワード抽出", description: "単語単位でAIがワードを抽出しクリック単位でコピー作成をサポートします" },
      { title: "新しい訴求を生み出す", description: "AIがLPサイトを分析しLPサイトに無い新しいアプローチをあなたへ" },
    ],
  },
  {
    shortTitle: "効率的に0→1を作りたい",
    features: [
      { title: "素材を入れるだけ", description: "商品画像・参考バナー・URLを入れるだけAIがお任せで効果的なバナーを生成します" },
      { title: "効率的な生成体験", description: "配置・構図・配色などをAIが自動で作成ただクリックするだけでAI生成体験が可能に" },
      { title: "プロ設定", description: "熟練の運用者向けにスタイルや訴求を細かく指定することもできます" },
    ],
  },
  {
    shortTitle: "記事に合わせたCRが作れない",
    features: [
      { title: "URLを入れるだけ", description: "AIが商品名やジャンルを抽出し当てるべき理想のターゲティングを自動的に" },
      { title: "アイデアの壁打ち", description: "煮詰まりがちな訴求やコピーをAIが提案無限大の壁打ち相手になってくれます" },
      { title: "AIにおまかせ", description: "URLを隅から隅まで見に行きます画像内の文字も認識しバナーを自動生成" },
    ],
  },
  {
    shortTitle: "商品に合うイメージが湧かない",
    features: [
      { title: "イメージから直感的に", description: "数あるサンプルからイメージに合うものを選択こんな感じが良い！でバナーが作れます" },
      { title: "プロンプト必要なし", description: "イメージを見て選ぶだけなので細かいプロンプト制御は一切必要ありません" },
      { title: "デザインアイデア必要なし", description: "専門的な用語やアイデアは必要なしイメージ選択はどんどん追加予定です" },
    ],
  },
  {
    shortTitle: "爆速で横展開させたい",
    features: [
      { title: "超効率的に横展開", description: "変えたいところだけ選択しワンアクションで複数枚生成できます" },
      { title: "細かく調整可能", description: "色・構成・フォント・人物など...変えたいところを細かく指定し効率的なAB検証ができます" },
      { title: "細かくAIにお願い", description: "テキストボックスから自分で細かくAIに指示を送ることもできます" },
    ],
  },
];

export const pains: Pain[] = PAINS_DATA.map((data, i) => {
  const id = String(i + 1).padStart(2, "0");
  return {
    id,
    shortTitle: data.shortTitle,
    fullTitle: data.shortTitle,
    videoSrc: `/videos/pain-${id}.mp4`,
    posterSrc: `/images/poster-pain-${id}.jpg`,
    features: data.features.map((f) => ({ iconName: "", ...f })),
  };
});
