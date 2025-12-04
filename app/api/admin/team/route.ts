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

export async function POST(request: Request) {
  try {
    const newMember: TeamMember = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const team: TeamMember[] = JSON.parse(data);
    
    // Generate new ID
    const maxId = team.reduce((max, m) => Math.max(max, parseInt(m.id)), 0);
    newMember.id = (maxId + 1).toString();
    
    team.push(newMember);
    await fs.writeFile(dataPath, JSON.stringify(team, null, 2));
    return NextResponse.json(newMember);
  } catch {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedMember: TeamMember = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const team: TeamMember[] = JSON.parse(data);
    
    const index = team.findIndex((m) => m.id === updatedMember.id);
    if (index === -1) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    
    team[index] = updatedMember;
    await fs.writeFile(dataPath, JSON.stringify(team, null, 2));
    return NextResponse.json(updatedMember);
  } catch {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    const data = await fs.readFile(dataPath, "utf-8");
    const team: TeamMember[] = JSON.parse(data);
    
    const filtered = team.filter((m) => m.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
