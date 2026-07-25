import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Webhook hit");

    const update = await req.json();

    console.log("Telegram Update:");
    console.log(JSON.stringify(update, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}