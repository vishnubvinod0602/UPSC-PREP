import { ai } from "./gemini";
import { SCHEDULE_PROMPT } from "./prompts";
import type { ScheduleEntry } from "./types";
import { ScheduleItem } from "@/types/schedule";

export async function extractSchedule(
  image: Buffer,
  mimeType: string
): Promise<ScheduleEntry[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",

    contents: [
      {
        role: "user",

        parts: [
          {
            inlineData: {
              mimeType,
              data: image.toString("base64"),
            },
          },
          {
            text: SCHEDULE_PROMPT,
          },
        ],
      },
    ],
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  try {
    return JSON.parse(text) as ScheduleEntry[];
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }
}