import { NextResponse } from "next/server";
import { getCanada, getUS } from "@/lib/adoption";

export async function GET() {
  const canada = getCanada();
  const us = getUS();
  return NextResponse.json({
    canada: canada.headline,
    canada_question: canada.question,
    us_sept_points: us.sept_points,
    us_fortnightly: us.fortnightly,
    us_question: us.question,
    wording_change: us.wording_change,
    key_caveat:
      "Reference windows differ: StatCan asks about the 12 months preceding the survey; BTOS asks about the last two weeks.",
  });
}
