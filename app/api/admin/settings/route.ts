import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Settings } from "@/lib/types";

const dataPath = path.join(process.cwd(), "lib/data/settings.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const settings: Settings = JSON.parse(data);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to read settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const settings: Settings = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(settings, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
