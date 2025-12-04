import { NextResponse } from "next/server";
import { getHomepageSettings } from "@/lib/cms";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
