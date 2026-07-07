import { Reveal } from "@/components/Reveal";

/* ================================================================
   Data
   ================================================================ */

type Plan = {
  name: string;
  price: string;
  quantity: string;
  unitPrice: string;
  recommended: boolean;
  colBorder: string;
  unitPriceColor: string;
};

const PLANS: Plan[] = [
  {
    name: "HUSTLE",
    price: "¥9,800",
    quantity: "150枚",
    unitPrice: "65.3",
    recommended: false,
    colBorder: "transparent",
    unitPriceColor: "#FFFFFF",
  },
  {
    name: "FLEX",
    price: "¥50,000",
    quantity: "1,000枚",
    unitPrice: "50.0",
    recommended: true,
    colBorder: "#FBBF24",
    unitPriceColor: "#34D399",
  },
  {
    name: "GOAT",
    price: "¥120,000",
    quantity: "3,000枚",
    unitPrice: "40.0",
    recommended: false,
    colBorder: "#F472B6",
    unitPriceColor: "#F472B6",
  },
];

type CellData = string | { text: string; color: string };

function cellText(cell: CellData): string {
  return typeof cell === "string" ? cell : cell.text;
}

function cellColor(cell: CellData): string | undefined {
  return typeof cell === "string" ? undefined : cell.color;
}

type FeatureRow = {
  label: string;
  values: [CellData, CellData, CellData];
};

const FEATURES: FeatureRow[] = [
  { label: "生成・編集機能", values: ["全部○", "全部○", "全部○"] },
  { label: "履歴保存", values: ["90日", "1年", "無期限"] },
  { label: "リフレッシュ無制限", values: ["10回まで", "●", "●"] },
  { label: "ABプロ参加券", values: ["×", "●", "●"] },
  { label: "案件共有", values: ["×", "●", "●"] },
  {
    label: "Cockpit席",
    values: ["×", { text: "1席無料", color: "#FBBF24" }, { text: "3席無料", color: "#F472B6" }],
  },
  { label: "優先生成", values: ["×", "×", "●"] },
  { label: "複数アカウント同接", values: ["×", "×", "●"] },
  { label: "丸投げOK\n（初期セットアップ）", values: ["応相談", "応相談", "●"] },
  {
    label: "サポート",
    values: [
      "オンラインのみ",
      "オンラインのみ",
      { text: "対面+オンライン", color: "#F472B6" },
    ],
  },
];

const NOTES = [
  "表示価格はすべて税抜です",
  "無料トライアルは7日間期間中の解約で料金は発生しません終了後はHUSTLEプラン（月額¥9,800）へ自動更新",
  "月間枚数超過時は従量課金：HUSTLE ¥80 ／ FLEX ¥55 ／ GOAT ¥45（1枚あたり）サポート利用時は別途初期費用が発生する場合あり",
];

/* ================================================================
   Cell renderer
   ================================================================ */

function Cell({ value, accent }: { value: CellData; accent?: string }) {
  const text = cellText(value);
  const color = cellColor(value);

  if (text === "●") {
    return (
      <span className="text-[16px]" style={{ color: color ?? accent }}>
        ●
      </span>
    );
  }

  if (text === "×") {
    return <span className="text-chalk-dim">×</span>;
  }

  return (
    <span
      className="text-[13px] leading-snug text-chalk-soft md:text-[14px]"
      style={color ? { color } : undefined}
    >
      {text}
    </span>
  );
}

/* ================================================================
   Desktop Table (semantic <table> for LLMO / accessibility)
   ================================================================ */

function DesktopTable() {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800/60 md:block">
      <table className="w-full table-fixed">
        <caption className="sr-only">AB Creative 料金プラン比較</caption>
        <colgroup>
          <col className="w-[170px]" />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-white/[0.06]">
            <td />
            {PLANS.map((plan) => {
              const featured = plan.recommended;
              const accent = plan.colBorder !== "transparent" ? plan.colBorder : undefined;
              return (
                <th
                  key={plan.name}
                  scope="col"
                  className={`border-l border-white/[0.06] px-4 pb-3 pt-3 text-center ${featured ? "bg-white/[0.02]" : ""}`}
                  style={featured ? { boxShadow: `inset 0 3px 0 ${accent}` } : undefined}
                >
                  {featured ? (
                    <span className="mb-1.5 inline-block rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-amber-400">
                      RECOMMENDED
                    </span>
                  ) : (
                    <span className="mb-1.5 inline-block py-0.5 text-[11px]">&nbsp;</span>
                  )}
                  <div
                    className="text-[22px] font-extrabold tracking-tight"
                    style={{ color: accent ?? "#FFFFFF" }}
                  >
                    {plan.name}
                  </div>
                  <div className="mt-1 text-[14px] text-chalk-soft">
                    {plan.price}
                    <span className="text-chalk-muted">/月</span>
                    <span className="mx-1.5 text-chalk-dim">·</span>
                    {plan.quantity}
                  </div>
                  <div className="mt-2">
                    <span
                      className="text-[32px] font-extrabold leading-none"
                      style={{ color: plan.unitPriceColor }}
                    >
                      ¥{plan.unitPrice}
                    </span>
                    <span className="text-[12px] text-chalk-muted">/枚</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((feature) => (
            <tr key={feature.label} className="border-t border-white/[0.04]">
              <th scope="row" className="px-4 py-1 text-left text-[12px] text-chalk-muted whitespace-pre-line">
                {feature.label}
              </th>
              {PLANS.map((plan, pi) => {
                const accent = plan.colBorder !== "transparent" ? plan.colBorder : undefined;
                return (
                  <td
                    key={plan.name}
                    className={`border-l border-white/[0.06] px-4 py-1 text-center ${plan.recommended ? "bg-white/[0.02]" : ""}`}
                  >
                    <Cell value={feature.values[pi]} accent={accent} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================
   Mobile Card (single plan)
   ================================================================ */

function MobileCard({ plan, planIdx }: { plan: Plan; planIdx: number }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-ink-800/60"
      style={{
        borderColor:
          plan.colBorder !== "transparent" ? plan.colBorder : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-5 pb-4 pt-5 text-center">
        {plan.recommended && (
          <span className="mb-2 inline-block rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-amber-400">
            RECOMMENDED
          </span>
        )}
        <div className="text-[22px] font-extrabold tracking-tight text-white">{plan.name}</div>
        <div className="mt-1 text-[15px] text-chalk-soft">
          {plan.price}
          <span className="text-chalk-muted">/月</span>
          <span className="mx-2 text-chalk-dim">·</span>
          {plan.quantity}
        </div>
        <div className="mt-3">
          <span className="text-[36px] font-extrabold" style={{ color: plan.unitPriceColor }}>
            ¥{plan.unitPrice}
          </span>
          <span className="text-[14px] text-chalk-muted">/枚</span>
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-white/[0.06]">
        {FEATURES.map((feature) => {
          const val = feature.values[planIdx];
          return (
            <div
              key={feature.label}
              className="flex items-center justify-between border-b border-white/[0.04] px-5 py-2.5"
            >
              <span className="text-[13px] text-chalk-muted">{feature.label}</span>
              <Cell value={val} accent={plan.colBorder !== "transparent" ? plan.colBorder : undefined} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   Main
   ================================================================ */

export function Pricing() {
  return (
    <section id="pricing" className="page-frame snap-split relative overflow-hidden py-10 md:py-[clamp(8px,2dvh,20px)]">
      {/* ---- Desktop: single page (unchanged) ---- */}
      <div className="mx-auto hidden max-w-container px-6 md:block">
        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-section font-extrabold text-white">プラン</h2>
              <p className="mt-1 max-w-[520px] text-[12px] leading-[1.5] text-chalk-soft">
                用途や規模に合わせて選べる3つのプランすべて高品質なAI生成をご利用いただけます
              </p>
            </div>
            <span className="rounded-lg border border-pink-400/40 bg-pink-400/10 px-4 py-2 text-[16px] font-bold text-pink-400">
              無料トライアル実施中
            </span>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-2">
            <DesktopTable />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mt-2 space-y-0">
            {NOTES.map((note) => (
              <li key={note.slice(0, 20)} className="text-[12px] leading-relaxed text-chalk-dim">
                ※　{note}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* ---- Mobile: heading + 3 plan cards, each a snap item ---- */}
      <div className="snap-item px-6 md:hidden">
        <div className="mx-auto w-full max-w-container text-center">
          <Reveal>
            <h2 className="text-[34px] font-extrabold leading-tight text-white">
              <span className="block">あなたに最適な</span>
              <span className="block">
                <span className="bg-gradient-to-r from-iris-400 via-iris-700 to-iris-400 bg-clip-text text-transparent">
                  プラン
                </span>
                
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-[1.8] text-chalk-soft">
              用途や規模に合わせて選べる3つのプラン
              <br />
              すべて高品質なAI生成をご利用いただけます
            </p>
            <span className="mt-5 inline-block rounded-lg border border-pink-400/40 bg-pink-400/10 px-4 py-2 text-[14px] font-bold text-pink-400">
              無料トライアル実施中
            </span>
          </Reveal>
        </div>
      </div>

      {PLANS.map((plan, i) => (
        <div key={plan.name} className="snap-item px-6 md:hidden">
          <div className="mx-auto w-full max-w-container">
            <MobileCard plan={plan} planIdx={i} />
            {i === PLANS.length - 1 && (
              <ul className="mt-4 space-y-0">
                {NOTES.map((note) => (
                  <li key={note.slice(0, 20)} className="text-[11px] leading-relaxed text-chalk-dim">
                    ※　{note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
