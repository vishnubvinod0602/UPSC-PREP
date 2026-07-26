import { createEvents, EventAttributes } from "ics";
import { DateTime } from "luxon";
import { ScheduleItem } from "@/types/schedule";



function parseDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return { day, month, year };
}

function parseTime(time: string) {
  const cleaned = time.trim().toUpperCase();

  const match = cleaned.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/
  );

  if (match) {
    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const period = match[3];

    if (period === "PM" && hour !== 12) {
      hour += 12;
    }

    if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return { hour, minute };
  }

  // 24-hour format fallback
  const [hour, minute] = cleaned.split(":").map(Number);

  return {
    hour,
    minute,
  };
}


export async function generateICS(
  schedule: ScheduleItem[]
): Promise<Buffer> {
  const events: EventAttributes[] = schedule.map((item) => {
    const d = parseDate(item.date);

    const start = parseTime(item.startTime);
    console.log(item.startTime);
    console.log(item.endTime);
    const end = parseTime(item.endTime);

    return {
      title: item.subject,
      description: [
        `Faculty: ${item.faculty ?? "-"}`,
        `Mode: ${item.mode ?? "-"}`,
      ].join("\n"),
      location: item.venue ?? "",
      start: [
        d.year,
        d.month,
        d.day,
        start.hour,
        start.minute,
      ],
      end: [
        d.year,
        d.month,
        d.day,
        end.hour,
        end.minute,
      ],
      status: "CONFIRMED",
      busyStatus: "BUSY",
    };
  });

  return new Promise((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(Buffer.from(value));
    });
  });
}