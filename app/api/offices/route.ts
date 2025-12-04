import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Office } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataPath = path.join(process.cwd(), "lib/data/offices.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const offices: Office[] = JSON.parse(data);
    return NextResponse.json(offices);
  } catch {
    return NextResponse.json(
      { error: "Failed to read offices" },
      { status: 500 }
    );
  }
}
