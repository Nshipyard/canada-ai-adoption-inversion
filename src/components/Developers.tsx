"use client";

import { useLang } from "@/i18n";
import McpConnect from "./McpConnect";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/series",
    desc: "Harmonized Canada vs US AI-adoption series: StatCan Q2 points plus the full 54-fortnight Census BTOS legacy series",
    response: `{
  "canada": [ { "quarter": "Q2 2025", "pct": 12.2 }, … ],
  "us_sept_points": [
    { "label": "Sept 2023", "pct": 3.7 },
    { "label": "Sept 2024", "pct": 6.0 },
    { "label": "Sept 2025", "pct": 10.0 } ],
  "us_fortnightly": [ { "fortnight": "202319",
    "ref_start": "08/28/2023", "pct": 3.7 }, … ]
}`,
  },
  {
    method: "GET",
    path: "/api/v1/sectors",
    desc: "2025 sector comparison: three sectors on both sides (Canada Q2 2025 vs US Sept 2025 fortnight)",
    response: `{
  "sectors": [ {
    "sector": "Finance and insurance",
    "canada_pct": 30.6, "us_pct": 17.1,
    "mapping_note": "StatCan industry grouping to BTOS NAICS 52"
  }, … ]
}`,
  },
  {
    method: "GET",
    path: "/api/v1/meta",
    desc: "Headline comparison, key caveat, sources, and pull date",
    response: `{
  "headline_2025": { "canada_pct": 12.2,
    "canada_label": "Q2 2025",
    "us_pct": 10.0, "us_label": "Sept 2025" },
  "key_caveat": "Reference windows differ: 12 months vs two weeks…"
}`,
  },
];

export default function Developers() {
  const { t } = useLang();
  return (
    <section id="developers" className="bg-ink text-white">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{t.developers.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.developers.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-white/70">{t.developers.body}</p>

        <h3 className="mt-14 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{t.developers.endpoints}</h3>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {endpoints.map((e) => (
            <article key={e.path} className="flex min-w-0 flex-col rounded-[24px] border border-white/15 bg-white/5 p-6">
              <p className="font-mono text-[12px] font-semibold text-white/60">{e.method}</p>
              <code className="mt-1 break-all font-mono text-[13px] text-white">{e.path}</code>
              <p className="mt-2 text-[14px] text-white/65">{e.desc}</p>
              <pre className="mt-4 flex-1 overflow-x-auto rounded-[16px] bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-white/80">
                {e.response}
              </pre>
              <a
                href={e.path}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block self-start rounded-full border border-white/25 px-5 py-2 text-[14px] font-semibold hover:border-white"
              >
                {t.developers.tryIt} →
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <a href="/api/openapi.json" target="_blank" rel="noreferrer" className="block rounded-[24px] bg-white/[0.06] p-6 hover:bg-white/[0.09]">
            <h4 className="text-[19px] font-semibold">{t.developers.openapi}</h4>
            <code className="mt-2 block font-mono text-[13px] text-white/60">GET /api/openapi.json</code>
          </a>
        </div>

        <McpConnect
          config={{
            slug: "canada-ai-adoption-inversion",
            displayName: "Canada AI Adoption Inversion",
            exampleEn: "Show me the harmonized Canada vs US AI adoption series and the sector comparison",
            exampleFr: "Montre-moi la série harmonisée d'adoption de l'IA Canada contre É.-U. et la comparaison sectorielle",
          }}
        />
      </div>
    </section>
  );
}
