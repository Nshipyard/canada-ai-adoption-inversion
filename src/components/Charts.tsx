"use client";

import { useLang } from "@/i18n";
import usData from "../../public/data/us_legacy_series.json";

function parseDate(s: string): number {
  const [m, d, y] = s.split("/").map(Number);
  return new Date(y, m - 1, d).getTime();
}

const W = 1200;
const H = 460;
const PAD = { l: 56, r: 24, t: 28, b: 64 };

export function TimeChart() {
  const { t } = useLang();
  const pts: { x: number; v: number }[] = (usData.fortnightly as { ref_start: string; pct: number }[]).map((p) => ({
    x: parseDate(p.ref_start),
    v: p.pct,
  }));
  const ca: { x: number; v: number; label: string }[] = [
    { x: new Date(2024, 4, 1).getTime(), v: 6.1, label: "Q2 2024" },
    { x: new Date(2025, 4, 1).getTime(), v: 12.2, label: "Q2 2025" },
    { x: new Date(2026, 4, 1).getTime(), v: 19.2, label: "Q2 2026" },
  ];
  const x0 = parseDate("08/01/2023");
  const x1 = new Date(2026, 8, 15).getTime();
  const yMax = 22;
  const X = (x: number) => PAD.l + ((x - x0) / (x1 - x0)) * (W - PAD.l - PAD.r);
  const Y = (v: number) => PAD.t + (1 - v / yMax) * (H - PAD.t - PAD.b);
  const usPath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${X(p.x).toFixed(1)},${Y(p.v).toFixed(1)}`).join(" ");
  const caPath = ca.map((p, i) => `${i === 0 ? "M" : "L"}${X(p.x).toFixed(1)},${Y(p.v).toFixed(1)}`).join(" ");
  const breakX = X(new Date(2025, 10, 17).getTime());
  const breakLines = t.chart.breakLabel.split(";").map((s) => s.trim());
  const ticks = [2023, 2024, 2025, 2026].map((y) => ({ y, x: X(new Date(y, 0, 1).getTime()) }));
  const fortnights = usData.fortnightly as { fortnight: string; ref_start: string; pct: number }[];
  const sept = (usData.sept_points as { label: string; pct: number; fortnight: string }[]).map((s) => {
    const f = fortnights.find((r) => r.fortnight === s.fortnight);
    return { ...s, x: f ? parseDate(f.ref_start) : 0 };
  });
  return (
    <figure className="overflow-hidden rounded-[24px] border border-line bg-paper p-4 md:p-8">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.chart.title}>
        {[0, 5, 10, 15, 20].map((v) => (
          <g key={v}>
            <line x1={PAD.l} x2={W - PAD.r} y1={Y(v)} y2={Y(v)} stroke="rgba(10,15,30,0.08)" />
            <text x={PAD.l - 10} y={Y(v) + 5} textAnchor="end" fontSize={15} fill="rgba(10,15,30,0.55)">{v}%</text>
          </g>
        ))}
        {ticks.map((tk) => (
          <text key={tk.y} x={tk.x} y={H - 36} textAnchor="middle" fontSize={15} fill="rgba(10,15,30,0.55)">{tk.y}</text>
        ))}
        <line x1={breakX} x2={breakX} y1={PAD.t} y2={H - PAD.b} stroke="#d80621" strokeDasharray="7 6" strokeWidth={2} />
        {breakLines.map((ln, i) => (
          <text key={i} x={breakX - 12} y={PAD.t + 18 + i * 19} textAnchor="end" fontSize={14} fill="#d80621" fontWeight={600}>
            {ln}
          </text>
        ))}
        <path d={usPath} fill="none" stroke="#8a93a6" strokeWidth={3} />
        <path d={caPath} fill="none" stroke="#d80621" strokeWidth={3.5} />
        {ca.map((p) => (
          <g key={p.label}>
            <circle cx={X(p.x)} cy={Y(p.v)} r={7} fill="#d80621" stroke="#fff" strokeWidth={2.5} />
            <text x={X(p.x)} y={Y(p.v) - 16} textAnchor="middle" fontSize={16} fontWeight={700} fill="#d80621">
              {`${p.v.toFixed(1)}%`}
            </text>
          </g>
        ))}
        {sept.map((s) => (
          <g key={s.label}>
            <circle cx={X(s.x)} cy={Y(s.pct)} r={5} fill="#8a93a6" stroke="#fff" strokeWidth={2} />
            <text x={X(s.x)} y={Y(s.pct) + 24} textAnchor="middle" fontSize={14} fill="rgba(10,15,30,0.6)">
              {s.label}: {s.pct.toFixed(1)}%
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex flex-wrap items-center gap-6 px-2 pb-2">
        <span className="flex items-center gap-2 text-[15px] font-medium">
          <span className="inline-block h-[4px] w-8 rounded bg-canada" /> {t.chart.canadaLabel}
        </span>
        <span className="flex items-center gap-2 text-[15px] font-medium text-ink/70">
          <span className="inline-block h-[4px] w-8 rounded bg-[#8a93a6]" /> {t.chart.usLabel}
        </span>
      </div>
      <figcaption className="px-2 text-[14px] text-ink/55">{t.chart.note}</figcaption>
    </figure>
  );
}

export function SectorBars() {
  const { t, lang } = useLang();
  const rows = t.sectors.rows;
  const max = 40;
  const fmt = (v: number) => `${(lang === "fr" ? String(v).replace(".", ",") : String(v))}%`;
  return (
    <div className="overflow-hidden rounded-[24px] border border-line bg-paper p-4 md:p-8">
      <div className="mb-6 flex justify-end gap-6 text-[14px] font-semibold">
        <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-sm bg-canada" />{t.sectors.canadaCol}</span>
        <span className="flex items-center gap-2 text-ink/60"><span className="inline-block h-3 w-3 rounded-sm bg-[#8a93a6]" />{t.sectors.usCol}</span>
      </div>
      <div className="space-y-8">
        {rows.map((r) => (
          <div key={r.name}>
            <p className="text-[16px] font-semibold">{r.name}</p>
            {r.note && <p className="mt-1 text-[13px] text-ink/55">{r.note}</p>}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-[26px] rounded-r-md bg-canada" style={{ width: `${(r.ca / max) * 100}%` }} />
                <span className="text-[15px] font-bold text-canada">{fmt(r.ca)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-[26px] rounded-r-md bg-[#8a93a6]" style={{ width: `${(r.us / max) * 100}%` }} />
                <span className="text-[15px] font-bold text-ink/60">{fmt(r.us)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[14px] text-ink/55">{t.sectors.footnote}</p>
    </div>
  );
}

export function FirmSizeBars() {
  const { t, lang } = useLang();
  const data = usData.firm_size_sept_2025 as { band: string; pct: number }[];
  const max = 15;
  const W2 = 900;
  const H2 = 340;
  const bw = (W2 - 80) / data.length;
  return (
    <figure className="overflow-hidden rounded-[24px] border border-line bg-paper p-4 md:p-8">
      <svg viewBox={`0 0 ${W2} ${H2}`} className="w-full" role="img" aria-label={t.firmsize.title}>
        {[0, 5, 10, 15].map((v) => {
          const y = 24 + (1 - v / max) * (H2 - 90);
          return (
            <g key={v}>
              <line x1={56} x2={W2 - 24} y1={y} y2={y} stroke="rgba(10,15,30,0.08)" />
              <text x={46} y={y + 5} textAnchor="end" fontSize={14} fill="rgba(10,15,30,0.55)">{v}%</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.pct / max) * (H2 - 90);
          const x = 56 + i * bw + bw * 0.2;
          const y = H2 - 66 - h;
          return (
            <g key={d.band}>
              <rect x={x} y={y} width={bw * 0.6} height={h} rx={5} fill="#8a93a6" />
              <text x={x + bw * 0.3} y={y - 10} textAnchor="middle" fontSize={16} fontWeight={700} fill="rgba(10,15,30,0.75)">
                {(lang === "fr" ? String(d.pct).replace(".", ",") : String(d.pct))}%
              </text>
              <text x={x + bw * 0.3} y={H2 - 42} textAnchor="middle" fontSize={14} fill="rgba(10,15,30,0.6)">{d.band}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 px-2 text-[14px] font-medium text-ink/60">{t.firmsize.usOnly}</figcaption>
    </figure>
  );
}
