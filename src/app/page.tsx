"use client";

import { useLang } from "@/i18n";
import { Banner, Nav, Footer } from "@/components/chrome";
import { TimeChart, SectorBars, FirmSizeBars } from "@/components/Charts";
import Methodology from "@/components/Methodology";
import Developers from "@/components/Developers";

function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.hero.kicker}</p>
        <h1 className="display mt-5 max-w-[920px] text-[52px] md:text-[84px]">{t.hero.title}</h1>
        <p className="mt-6 max-w-[700px] text-[19px] leading-relaxed text-ink/70 md:text-[21px]">{t.hero.sub}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#chart" className="rounded-full bg-canada px-7 py-3.5 text-[16px] font-semibold text-white hover:bg-canada-dark">
            {t.hero.cta1}
          </a>
          <a href="#methodology" className="rounded-full border border-line px-7 py-3.5 text-[16px] font-semibold hover:border-ink">
            {t.hero.cta2}
          </a>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.value} className="bg-paper p-7">
              <p className="display text-[44px] text-canada">{s.value}</p>
              <p className="mt-2 text-[15px] leading-snug text-ink/65">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChartSection() {
  const { t } = useLang();
  return (
    <section id="chart" className="bg-paper-warm">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.chart.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.chart.title}</h2>
        <p className="mt-5 max-w-[760px] text-[18px] leading-relaxed text-ink/70">{t.chart.sub}</p>
        <div className="mt-10">
          <TimeChart />
        </div>
        <p className="display mt-8 max-w-[800px] text-[26px] leading-snug text-ink md:text-[32px]">
          {t.chart.annotation}
        </p>
      </div>
    </section>
  );
}

function SectorsSection() {
  const { t } = useLang();
  return (
    <section id="sectors" className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.sectors.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.sectors.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-ink/70">{t.sectors.sub}</p>
        <div className="mt-10 max-w-[960px]">
          <SectorBars />
        </div>
      </div>
    </section>
  );
}

function FirmSizeSection() {
  const { t } = useLang();
  return (
    <section id="firmsize" className="bg-paper-warm">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.firmsize.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.firmsize.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-ink/70">{t.firmsize.sub}</p>
        <div className="mt-10 max-w-[960px]">
          <FirmSizeBars />
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const { t } = useLang();
  return (
    <section id="showcase" className="bg-ink text-white">
      <div className="mx-auto max-w-[1392px] scroll-mt-20 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {t.showcase.kicker}
          </p>
          <h2 className="display text-[clamp(34px,4.5vw,56px)]">{t.showcase.title}</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] leading-relaxed text-white/65">
            {t.showcase.body}
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-5 md:grid-cols-3">
          {t.showcase.items.map((s, i) => (
            <article key={s.q} className="flex flex-col rounded-[40px] border border-white/12 bg-white/[0.04] p-8">
              <span className="display w-fit text-[26px] text-canada">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-5 text-[28px] leading-tight">{s.q}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">{s.answer}</p>
              <p className="mt-auto pt-6 text-[14px] text-white/50">
                <span className="font-semibold text-white/80">{t.showcase.source}:</span> {s.sources}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Caveats() {
  const { t } = useLang();
  return (
    <section id="caveats" className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.caveats.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.caveats.title}</h2>
        <ol className="mt-10 max-w-[800px] space-y-5">
          {t.caveats.items.map((item, i) => (
            <li key={i} className="flex gap-5 rounded-[20px] border border-line bg-paper-warm p-6">
              <span className="display shrink-0 text-[28px] text-canada">{String(i + 1).padStart(2, "0")}</span>
              <p className="pt-1 text-[16px] leading-relaxed text-ink/75">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Rebuttal() {
  const { t } = useLang();
  return (
    <section id="rebuttal" className="bg-ink text-white">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/60">{t.rebuttal.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.rebuttal.title}</h2>
        <p className="mt-6 max-w-[760px] text-[18px] leading-relaxed text-white/80 md:text-[20px]">{t.rebuttal.body}</p>
      </div>
    </section>
  );
}

function Downloads() {
  const { t } = useLang();
  return (
    <section id="data" className="bg-paper">
      <div className="mx-auto max-w-[1392px] px-6 py-20 md:py-28">
        <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-canada">{t.downloads.kicker}</p>
        <h2 className="display mt-4 max-w-[720px] text-[40px] md:text-[52px]">{t.downloads.title}</h2>
        <p className="mt-5 max-w-[720px] text-[18px] leading-relaxed text-ink/70">{t.downloads.body}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {t.downloads.files.map((f) => (
            <div key={f.name} className="flex items-center justify-between gap-4 rounded-[24px] border border-line bg-paper-warm p-6">
              <div className="min-w-0">
                <code className="font-mono text-[15px] font-medium break-all">{f.name}</code>
                <p className="mt-1 text-[14px] text-ink/60">{f.desc}</p>
              </div>
              <a href={`/data/${f.name}`} download className="shrink-0 rounded-full border border-line px-5 py-2.5 text-[15px] font-semibold hover:border-ink">
                {t.downloads.download}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Banner />
      <Nav />
      <main className="flex-1">
        <Hero />
        <ChartSection />
        <SectorsSection />
        <FirmSizeSection />
        <Showcase />
        <Caveats />
        <Rebuttal />
        <Methodology />
        <Developers />
        <Downloads />
      </main>
      <Footer />
    </>
  );
}
