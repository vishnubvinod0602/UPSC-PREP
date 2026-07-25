import { NextRequest, NextResponse } from "next/server";
import type { ScheduleEntry } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const { schedule } = await req.json();

    if (!Array.isArray(schedule)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid schedule.",
        },
        {
          status: 400,
        }
      );
    }


    return NextResponse.json({
      success: true,
      message: "Schedule saved successfully.",
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