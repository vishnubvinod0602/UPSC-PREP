import { DateTime } from "luxon";
import type { ScheduleEvent } from "@/types/schedule";

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatICSDate(dt: DateTime): string {
  return dt.toFormat("yyyyLLdd'T'HHmmss");
}

export async function generateICS(
  schedule: ScheduleEvent[]
): Promise<Buffer> {
  const now = DateTime.utc().toFormat("yyyyLLdd'T'HHmmss'Z'");

  const events = schedule
    .map((event) => {
      const start = DateTime.fromISO(event.startLocal, {
  setZone: true,
});

const end = DateTime.fromISO(event.endLocal, {
  setZone: true,
});
console.log({
  subject: event.subject,
  startLocal: event.startLocal,
  parsed: formatICSDate(start),
});
      return `BEGIN:VEVENT
UID:${crypto.randomUUID()}
DTSTAMP:${now}
SUMMARY:${escapeICS(event.subject)}
DESCRIPTION:${escapeICS(
  `Faculty: ${event.faculty || "-"}\nMode: ${event.mode || "-"}`
)}
LOCATION:${escapeICS(event.venue || "")}
DTSTART;TZID=Asia/Kolkata:${formatICSDate(start)}
DTEND;TZID=Asia/Kolkata:${formatICSDate(end)}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT`;
    })
    .join("\r\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UPSC Mentor OS//Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Fortune IAS Schedule
BEGIN:VTIMEZONE
TZID:Asia/Kolkata
BEGIN:STANDARD
TZOFFSETFROM:+0530
TZOFFSETTO:+0530
TZNAME:IST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
${events}
END:VCALENDAR`;

  return Buffer.from(ics.replace(/\n/g, "\r\n"));
}