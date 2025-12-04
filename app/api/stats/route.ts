import { NextResponse } from "next/server";
import { getHomepageSettings } from "@/lib/cms";

export async function GET() {
  try {
    const homepage = await getHomepageSettings();
    return NextResponse.json(homepage?.stats || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to read stats" },
      { status: 500 }
    );
  }
}
