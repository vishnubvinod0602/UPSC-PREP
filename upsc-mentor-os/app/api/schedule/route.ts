import { NextRequest, NextResponse } from "next/server";

import { extractSchedule } from "@/lib/ai/extractSchedule";
import { validateSchedule } from "@/lib/ai/validate";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Image is required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const schedule = await extractSchedule(
      buffer,
      image.type
    );

    const validated = validateSchedule(schedule);

    return NextResponse.json({
      success: true,
      schedule: validated,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}