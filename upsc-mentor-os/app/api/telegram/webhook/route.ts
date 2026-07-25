import { NextRequest, NextResponse } from "next/server";
import {
  downloadTelegramFile,
  getTelegramFile,
  sendTelegramMessage,
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

      await sendTelegramMessage(
        "📷 Send me a coaching timetable image and I'll extract the schedule."
      );

      return NextResponse.json({ ok: true });
    }

    // Photo messages
    const largestPhoto = message.photo?.at(-1);

    if (largestPhoto) {
      console.log("Photo received");

      const file = await getTelegramFile(largestPhoto.file_id);

      console.log("File path:", file.file_path);

      const imageBuffer = await downloadTelegramFile(file.file_path);

      console.log("Downloaded bytes:", imageBuffer.byteLength);

      const schedule = await extractSchedule(
        Buffer.from(imageBuffer),
        "image/jpeg"
      );

      console.log(schedule);

      if (schedule.length === 0) {
        await sendTelegramMessage(
          "❌ I couldn't detect any schedule entries in this image."
        );

        return NextResponse.json({ ok: true });
      }

      // Summary
      const subjects = [
        ...new Set(
          schedule
            .map((item) => item.subject?.trim())
            .filter(Boolean)
        ),
      ];

      const faculties = [
        ...new Set(
          schedule
            .map((item) => item.faculty?.trim())
            .filter(Boolean)
        ),
      ];

      const modes = [
        ...new Set(
          schedule
            .map((item) => item.mode?.trim())
            .filter(Boolean)
        ),
      ];

      const venues = [
        ...new Set(
          schedule
            .map((item) => item.venue?.trim())
            .filter(Boolean)
        ),
      ];

      const firstDate = schedule[0]?.date || "-";
      const lastDate = schedule[schedule.length - 1]?.date || "-";

      const summary = `📅 Schedule Extracted Successfully

━━━━━━━━━━━━━━

🗓 Date Range
${firstDate} → ${lastDate}

📖 Total Classes
${schedule.length}

📚 Subjects
${subjects.length ? subjects.map((s) => `• ${s}`).join("\n") : "-"}

👨‍🏫 Faculties
${faculties.length ? faculties.map((f) => `• ${f}`).join("\n") : "-"}

🎓 Mode
${modes.length ? modes.join(", ") : "-"}

🏫 Venue
${venues.length ? venues.join(", ") : "-"}

━━━━━━━━━━━━━━

Reply:

YES ✅  Save Schedule

NO ❌  Cancel Import`;

      // TODO:
      // Store 'schedule' temporarily (Redis/database)
      // using the Telegram chat ID so that
      // YES can save it later.

      await sendTelegramMessage(summary);
    }

    // Documents
    if (message.document) {
      await sendTelegramMessage(
        "📄 PDF import will be available soon."
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    await sendTelegramMessage(
      "❌ Failed to process the timetable."
    );

    return NextResponse.json(
      {
        ok: false,
      },
      { status: 500 }
    );
  }
}