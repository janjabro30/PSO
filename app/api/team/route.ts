import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { TeamMember } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataPath = path.join(process.cwd(), "lib/data/team.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const team: TeamMember[] = JSON.parse(data);
    return NextResponse.json(team);
  } catch {
    return NextResponse.json(
      { error: "Failed to read team" },
      { status: 500 }
    );
  }
}
