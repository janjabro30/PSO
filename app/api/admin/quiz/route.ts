import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { QuizData } from "@/lib/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const dataPath = path.join(process.cwd(), "lib/data/quiz.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const quiz: QuizData = JSON.parse(data);
    return NextResponse.json(quiz);
  } catch {
    return NextResponse.json(
      { error: "Failed to read quiz" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const quiz: QuizData = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(quiz, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 }
    );
  }
}
