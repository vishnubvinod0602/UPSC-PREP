import { NextRequest, NextResponse } from "next/server";

import {
  downloadTelegramFile,
  getTelegramFile,
  sendTelegramDocument,
  sendTelegramMessage,
} from "@/lib/telegram";

import { extractSchedule } from "@/lib/ai/extractSchedule";
import {
  getLatestPendingImport,
  markCancelled,
  markImported,
  savePendingImport,
} from "@/lib/pendingImports";

import { importSchedule } from "@/lib/importSchedule";
import { generateICS } from "@/lib/calendar/generateICS";

import type { ScheduleEvent } from "@/types/schedule";

export async function POST(req: NextRequest) {
  let chatId = "";

  try {
    const update = await req.json();
    const message = update.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    chatId = String(message.chat.id);

    /******************************************************
     * TEXT MESSAGES
     ******************************************************/
    if (message.text) {
      const text = message.text.trim().toUpperCase();

      if (text === "YES") {
        const pending = await getLatestPendingImport(chatId);

        if (!pending) {
          await sendTelegramMessage(
            chatId,
            "❌ No pending schedule found."
          );

          return NextResponse.json({ ok: true });
        }

        const schedule = JSON.parse(
          pending.schedule
        ) as ScheduleEvent[];

        const importedRows = await importSchedule(schedule);

        await markImported(pending.id);

        const icsFile = await generateICS(importedRows);

        await sendTelegramDocument(
          chatId,
          icsFile,
          "UPSC-Schedule.ics"
        );

        await sendTelegramMessage(
          chatId,
          `✅ Schedule imported successfully.

${importedRows.length} classes have been added.

📅 Your calendar file has been sent.

Open it in Google Calendar, Apple Calendar, Outlook or Samsung Calendar to import your schedule.`
        );

        return NextResponse.json({ ok: true });
      }

      if (text === "NO") {
        const pending = await getLatestPendingImport(chatId);

        if (pending) {
          await markCancelled(pending.id);
        }

        await sendTelegramMessage(
          chatId,
          "❌ Schedule import cancelled."
        );

        return NextResponse.json({ ok: true });
      }

      await sendTelegramMessage(
        chatId,
        "📷 Send me a coaching timetable image and I'll extract the schedule."
      );

      return NextResponse.json({ ok: true });
    }

    /******************************************************
     * PHOTO MESSAGES
     ******************************************************/
    const largestPhoto = message.photo?.at(-1);

    if (largestPhoto) {
      const file = await getTelegramFile(largestPhoto.file_id);

      const imageBuffer = await downloadTelegramFile(
        file.file_path
      );

      const schedule = await extractSchedule(
        Buffer.from(imageBuffer),
        "image/jpeg"
      );

      if (schedule.length === 0) {
        await sendTelegramMessage(
          chatId,
          "❌ I couldn't detect any schedule entries in this image."
        );

        return NextResponse.json({ ok: true });
      }

      const subjects = [
        ...new Set(
          schedule
            .map((item) => item.subject.trim())
            .filter(Boolean)
        ),
      ];

      const faculties = [
        ...new Set(
          schedule
            .map((item) => item.faculty.trim())
            .filter(Boolean)
        ),
      ];

      const modes = [
        ...new Set(
          schedule
            .map((item) => item.mode.trim())
            .filter(Boolean)
        ),
      ];

      const venues = [
        ...new Set(
          schedule
            .map((item) => item.venue.trim())
            .filter(Boolean)
        ),
      ];

      const firstDate =
        schedule.length > 0
          ? new Date(schedule[0].startLocal).toLocaleDateString(
              "en-GB"
            )
          : "-";

      const lastDate =
        schedule.length > 0
          ? new Date(
              schedule[schedule.length - 1].startLocal
            ).toLocaleDateString("en-GB")
          : "-";

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

YES ✅ Save Schedule

NO ❌ Cancel Import`;

      await savePendingImport(chatId, schedule);

      await sendTelegramMessage(chatId, summary);

      return NextResponse.json({ ok: true });
    }

    /******************************************************
     * DOCUMENTS
     ******************************************************/
    if (message.document) {
      await sendTelegramMessage(
        chatId,
        "📄 PDF timetable import will be available soon."
      );
    }

    return NextResponse.json({ ok: true });

} catch (error) {
  console.error(error);

  if (chatId) {
    await sendTelegramMessage(
      chatId,
      `❌ Failed to process timetable.

${error instanceof Error ? error.message : String(error)}`
    );
  }

  return NextResponse.json(
    { ok: false },
    { status: 500 }
  );
}
}