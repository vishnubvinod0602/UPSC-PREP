import { DateTime } from "luxon";
import { COACHING } from "@/lib/constants/timezone";

export function coachingDateTime(
  date: string,
  time: string
) {
  return DateTime.fromFormat(
    `${date} ${time}`,
    "dd-MM-yyyy h:mm a",
    {
      zone: COACHING.timezone,
    }
  );
}

export function coachingUTC(
  date: string,
  time: string
) {
  return coachingDateTime(
    date,
    time
  ).toUTC();
}