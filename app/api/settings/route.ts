import { NextResponse } from "next/server";
import { getSettings } from "@/lib/cms";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to read settings" },
      { status: 500 }
    );
  }
}
