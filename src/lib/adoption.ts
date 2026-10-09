import { readFileSync } from "fs";
import { join } from "path";

const DATA = join(process.cwd(), "public", "data");

function load<T>(name: string): T {
  return JSON.parse(readFileSync(join(DATA, name), "utf-8")) as T;
}

export interface FortnightPoint {
  fortnight: string;
  col_start: string;
  ref_start: string;
  ref_end: string;
  pct: number;
}
export interface SeptPoint {
  label: string;
  fortnight: string;
  pct: number;
}
export interface SectorPoint {
  naics: string;
  sector: string;
  pct: number | null;
}
export interface FirmSizePoint {
  band: string;
  pct: number | null;
}
export interface CanadaHeadline {
  quarter: string;
  collection: string;
  pct: number;
  source?: string;
  note?: string;
}
export interface CanadaSector {
  sector: string;
  pct_2025: number;
  pct_2024: number | null;
}

export function getMeta() {
  return load<Record<string, unknown>>("meta.json");
}
export function getCanada() {
  return load<{
    question: string;
    survey: string;
    source_publication: string;
    source_table_cited: string;
    sample: { invited: number; respondents: number };
    headline: CanadaHeadline[];
    sectors_q2_2025: CanadaSector[];
    firm_size_note: string;
  }>("canada.json");
}
export function getUS() {
  return load<{
    question: string;
    survey: string;
    source_file: string;
    source_file_url: string;
    wording_change_pdf: string;
    pull_date: string;
    wording_change: string;
    new_series_start: string;
    sept_points: SeptPoint[];
    fortnightly: FortnightPoint[];
    sectors_sept_2025: SectorPoint[];
    firm_size_sept_2025: FirmSizePoint[];
  }>("us_legacy_series.json");
}
