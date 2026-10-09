import { NextResponse } from "next/server";

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Canada AI Adoption Inversion API",
    version: "1.0.0",
    description:
      "On the one AI-adoption survey question Canada and the US asked businesses in nearly identical words, which country is ahead? Harmonized series from Statistics Canada's Canadian Survey on Business Conditions (Q2 2025: 12.2%) and the U.S. Census Bureau's Business Trends and Outlook Survey legacy question (Sept 2025: 10.0%, full 54-fortnight series). Key caveat: StatCan asks about 12 months, BTOS about two weeks. MIT licensed.",
  },
  servers: [{ url: "https://adoption.canada.nshipyard.com/api/v1" }],
  paths: {
    "/series": {
      get: {
        summary: "Harmonized Canada vs US AI-adoption series with September reference points and the full US fortnightly series",
        responses: { "200": { description: "Canada headline points, US September points, full fortnightly series, wording-change date" } },
      },
    },
    "/sectors": {
      get: {
        summary: "2025 sector comparison for three sectors on both sides of the border",
        responses: { "200": { description: "Canada Q2 2025 vs US Sept 2025 sector shares with mapping notes" } },
      },
    },
    "/meta": {
      get: {
        summary: "Headline comparison, key caveat, sources, and pull date",
        responses: { "200": { description: "Build metadata" } },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec);
}
