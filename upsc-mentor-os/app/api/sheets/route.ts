import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz_7_Ec9Bf0ew3yrjOgMSx0MRrrxJW1CiyjS6_m4Ab4_Zl5QZtMioHwwyRqKE22i5GW/exec";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.search;

  const res = await fetch(
    `${APPS_SCRIPT_URL}${search}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}