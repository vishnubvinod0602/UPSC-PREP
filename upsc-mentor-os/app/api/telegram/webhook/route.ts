import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Webhook hit");

    const update = await req.json();

    const message = update.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    // Text message
    if (message.text) {
      console.log("Text:", message.text);
    }

    // Photo
    if (message.photo) {
      console.log("Photo received");
      console.log(message.photo);
    }

    // PDF / Document
    if (message.document) {
      console.log("Document received");
      console.log(message.document);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}