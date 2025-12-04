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

export async function POST(request: Request) {
  try {
    const newArticle: Article = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const articles: Article[] = JSON.parse(data);
    
    // Generate new ID
    const maxId = articles.reduce((max, a) => Math.max(max, parseInt(a.id)), 0);
    newArticle.id = (maxId + 1).toString();
    
    articles.push(newArticle);
    await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));
    return NextResponse.json(newArticle);
  } catch {
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedArticle: Article = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const articles: Article[] = JSON.parse(data);
    
    const index = articles.findIndex((a) => a.id === updatedArticle.id);
    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    
    articles[index] = updatedArticle;
    await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));
    return NextResponse.json(updatedArticle);
  } catch {
    return NextResponse.json(
      { error: "Failed to update article" },
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
    const articles: Article[] = JSON.parse(data);
    
    const filtered = articles.filter((a) => a.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
