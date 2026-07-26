import { createEvents, EventAttributes } from "ics";

export interface ScheduleItem {
      id?: string;
  subject: string;
  faculty?: string;
  venue?: string;
  mode?: string;
  date: string;
  startTime: string;
  endTime: string;
}

function parseDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return { day, month, year };
}

function parseTime(time: string) {
  const cleaned = time.trim();
  
  if (cleaned.includes(":")) {
    const [hour, minute] = cleaned.split(":").map(Number);

    return {
      hour,
      minute,
    };
  }

  // HH
  return {
    hour: Number(cleaned),
    minute: 0,
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