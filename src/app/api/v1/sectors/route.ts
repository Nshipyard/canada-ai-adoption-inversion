import { NextResponse } from "next/server";
import { getCanada, getUS } from "@/lib/adoption";

const MAP: Record<string, { ca: string; note: string }> = {
  "51": { ca: "Information and cultural industries", note: "StatCan groups cultural industries with information; US NAICS 51 is information only." },
  "52": { ca: "Finance and insurance", note: "" },
  "54": { ca: "Professional, scientific and technical services", note: "" },
};

export async function GET() {
  const canada = getCanada();
  const us = getUS();
  const caByName = new Map(canada.sectors_q2_2025.map((s) => [s.sector, s]));
  const sectors = us.sectors_sept_2025
    .filter((s) => MAP[s.naics])
    .map((s) => {
      const ca = caByName.get(MAP[s.naics].ca)!;
      return {
        naics: s.naics,
        sector: MAP[s.naics].ca,
        canada_pct: ca.pct_2025,
        canada_label: "Q2 2025",
        us_pct: s.pct,
        us_label: "Sept 2025 fortnight",
        mapping_note: MAP[s.naics].note,
      };
    });
  return NextResponse.json({ sectors });
}
