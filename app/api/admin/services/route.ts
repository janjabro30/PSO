import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Service } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataPath = path.join(process.cwd(), "lib/data/services.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const services: Service[] = JSON.parse(data);
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: "Failed to read services" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const services: Service[] = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(services, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update services" },
      { status: 500 }
    );
  }
}
