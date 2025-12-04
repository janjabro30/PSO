import { promises as fs } from "fs";
import path from "path";
import type { Settings } from "./types";

const settingsPath = path.join(process.cwd(), "lib/data/settings.json");

export async function getSettings(): Promise<Settings> {
  const data = await fs.readFile(settingsPath, "utf-8");
  return JSON.parse(data);
}

export async function updateSettings(settings: Settings): Promise<void> {
  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
}

// Helper to get just homepage settings
export async function getHomepageSettings() {
  const settings = await getSettings();
  return settings.homepage;
}
