import { ai } from "./gemini";
import { SCHEDULE_PROMPT } from "./prompts";
import type { ScheduleEvent } from "@/types/schedule";

export async function extractSchedule(
  image: Buffer,
  mimeType: string
): Promise<ScheduleEvent[]> {
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
console.log(JSON.stringify(scheduler, null ,2));
  const cleanText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanText) as ScheduleEvent[];
  } catch (error) {
    console.error("Invalid Gemini response:", cleanText);

    throw new Error(
      `Gemini returned invalid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}