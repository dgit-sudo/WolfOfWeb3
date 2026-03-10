import fs from "node:fs";
import path from "node:path";
import type { AdminContentItem, AdminContentType, AdminSection } from "@/lib/admin-content";

const DB_PATH = path.join(process.cwd(), ".data", "admin-content.json");

const readAll = (): AdminContentItem[] => {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (items: AdminContentItem[]) => {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(items, null, 2), "utf-8");
};

export const getAllAdminContent = (): AdminContentItem[] =>
  readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export const getAdminContentBySection = (section: AdminSection): AdminContentItem[] =>
  readAll()
    .filter((item) => item.section === section)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export const getAdminContentById = (id: string): AdminContentItem | null =>
  readAll().find((item) => item.id === id) ?? null;

export const createAdminContent = (input: {
  section: AdminSection;
  type: AdminContentType;
  title: string;
  description: string;
  url: string;
  content?: string;
  thumbnailUrl?: string;
  tags?: string[];
}) => {
  const items = readAll();
  const newItem: AdminContentItem = {
    ...input,
    tags: input.tags ?? [],
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  writeAll([newItem, ...items]);
};

export const deleteAdminContentById = (id: string) => {
  const items = readAll();
  writeAll(items.filter((item) => item.id !== id));
};
