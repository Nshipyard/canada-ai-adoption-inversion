import { NextResponse } from "next/server";
import { getMeta } from "@/lib/adoption";

export async function GET() {
  return NextResponse.json(getMeta());
}
