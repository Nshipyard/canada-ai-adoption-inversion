import { NextResponse } from "next/server";
import { getMeta, getCanada, getUS } from "@/lib/adoption";

const SERVER = { name: "canada-ai-adoption-inversion", version: "1.0.0" };

const TOOLS = [
  {
    name: "series_lookup",
    description:
      "Harmonized Canada vs US AI-adoption series: StatCan CSBC headline points (Q2 2024: 6.1%, Q2 2025: 12.2%, Q2 2026: 19.2%) and the full 54-fortnight Census BTOS legacy series with September reference points (2023: 3.7%, 2024: 6.0%, 2025: 10.0%). Key caveat: StatCan asks about 12 months, BTOS about two weeks.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "sector_comparison",
    description:
      "2025 sector comparison, three sectors on both sides: information (CA 35.6% vs US 29.3%), professional/scientific/technical (31.7% vs 23.9%), finance and insurance (30.6% vs 17.1%).",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "firmsize_us",
    description:
      "US-only firm-size AI-adoption shares, September 2025 fortnight, seven employee bands (1-4 through 250+). StatCan firm-size cuts were not retrievable at build time.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "coverage",
    description:
      "What the comparison can and cannot show: the reference-window difference, the November 2025 US question change, and the sources with pull dates.",
    inputSchema: { type: "object", properties: {} },
  },
];

function ok(id: unknown, result: unknown) {
  return { jsonrpc: "2.0", id, result };
}
function err(id: unknown, code: number, message: string) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
function textResult(data: unknown) {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

function handle(msg: any) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") {
    return err(msg?.id ?? null, -32600, "Invalid Request");
  }
  const id = msg.id ?? null;
  switch (msg.method) {
    case "initialize":
      return ok(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: SERVER,
      });
    case "notifications/initialized":
      return null;
    case "tools/list":
      return ok(id, { tools: TOOLS });
    case "tools/call": {
      const { name } = msg.params ?? {};
      try {
        if (name === "series_lookup") {
          const canada = getCanada();
          const us = getUS();
          return ok(id, textResult({
            canada_headline: canada.headline,
            us_sept_points: us.sept_points,
            key_caveat: "StatCan asks about the 12 months preceding the survey; BTOS asks about the last two weeks.",
          }));
        }
        if (name === "sector_comparison") {
          const canada = getCanada();
          const us = getUS();
          const map: Record<string, string> = {
            "51": "Information and cultural industries",
            "52": "Finance and insurance",
            "54": "Professional, scientific and technical services",
          };
          const ca = new Map(canada.sectors_q2_2025.map((s) => [s.sector, s.pct_2025]));
          return ok(id, textResult(
            us.sectors_sept_2025
              .filter((s) => map[s.naics])
              .map((s) => ({ sector: map[s.naics], canada_q2_2025: ca.get(map[s.naics]), us_sept_2025: s.pct }))
          ));
        }
        if (name === "firmsize_us") {
          return ok(id, textResult(getUS().firm_size_sept_2025));
        }
        if (name === "coverage") {
          return ok(id, textResult(getMeta()));
        }
        return err(id, -32601, `Unknown tool ${name}`);
      } catch (e) {
        return err(id, -32000, String(e));
      }
    }
    default:
      return err(id, -32601, `Unknown method ${msg.method}`);
  }
}

export async function POST(req: Request) {
  const msg = await req.json();
  const res = handle(msg);
  if (res === null) return new NextResponse(null, { status: 202 });
  return NextResponse.json(res);
}

export async function GET() {
  return NextResponse.json({ name: SERVER.name, version: SERVER.version, transport: "streamable-http", tools: TOOLS.map((t) => t.name) });
}
