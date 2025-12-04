import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Article } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataPath = path.join(process.cwd(), "lib/data/articles.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const articles: Article[] = JSON.parse(data);
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json(
      { error: "Failed to read articles" },
      { status: 500 }
    );
  }
}
