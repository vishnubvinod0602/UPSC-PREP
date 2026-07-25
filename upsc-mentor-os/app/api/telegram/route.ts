import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const update = await req.json();

  console.log(JSON.stringify(update, null, 2));

  return NextResponse.json({
    ok: true,
  });
}