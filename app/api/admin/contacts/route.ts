import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { ContactSubmission } from "@/lib/types";

const dataPath = path.join(process.cwd(), "lib/data/contacts.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const contacts: ContactSubmission[] = JSON.parse(data);
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { error: "Failed to read contacts" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedContact: ContactSubmission = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const contacts: ContactSubmission[] = JSON.parse(data);
    
    const index = contacts.findIndex((c) => c.id === updatedContact.id);
    if (index === -1) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    contacts[index] = updatedContact;
    await fs.writeFile(dataPath, JSON.stringify(contacts, null, 2));
    return NextResponse.json(updatedContact);
  } catch {
    return NextResponse.json(
      { error: "Failed to update contact" },
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
    const contacts: ContactSubmission[] = JSON.parse(data);
    
    const filtered = contacts.filter((c) => c.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
