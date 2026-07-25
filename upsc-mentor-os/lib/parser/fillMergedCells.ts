import type { ScheduleEntry } from "./types";

import { normalizeText } from "./normalize";
import { extractDate } from "./extractDate";
import { extractTime } from "./extractTime";
import { extractMode } from "./extractMode";
import { extractVenue } from "./extractVenue";
import { extractSubject } from "./extractSubject";
import { extractFaculty } from "./extractFaculty";

export function parseSchedule(text: string): ScheduleEntry | null {
  const normalized = normalizeText(text);

  const date = extractDate(normalized);
  const { startTime, endTime } = extractTime(normalized);
  const mode = extractMode(normalized);
  const venue = extractVenue(normalized);
  const subject = extractSubject(normalized);
  const faculty = extractFaculty(normalized);

  if (!date || !startTime || !endTime) {
    return null;
  }

  return {
    date,
    startTime,
    endTime,
    subject,
    faculty,
    mode,
    venue,
  };
}