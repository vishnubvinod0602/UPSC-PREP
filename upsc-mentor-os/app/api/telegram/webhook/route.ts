import { NextRequest, NextResponse } from "next/server";
import {
  getTelegramFile,
  downloadTelegramFile,
} from "@/lib/telegram";
import { extractSchedule } from "@/lib/ai/extractSchedule";

export async function POST(req: NextRequest) {
  try {
    console.log("Webhook hit");

    const update = await req.json();
    const message = update.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    // Text messages
    if (message.text) {
      console.log("Text:", message.text);
    }

    // Photo messages
    const largestPhoto = message.photo?.at(-1);

    if (largestPhoto) {
      console.log("Photo received");

      const file = await getTelegramFile(largestPhoto.file_id);

      console.log("File path:", file.file_path);

      const imageBuffer = await downloadTelegramFile(file.file_path);
      

const schedule = await extractSchedule(
  Buffer.from(imageBuffer),
  "image/jpeg"
);

console.log(schedule);

      console.log("Downloaded bytes:", imageBuffer.byteLength);
    }

    // Documents
    if (message.document) {
      console.log("Document:", message.document.file_name);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}