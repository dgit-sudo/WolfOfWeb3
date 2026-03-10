import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { AdminContentItem, AdminContentType, AdminSection } from "@/lib/admin-content";

type AdminContentRow = {
  id: number;
  section: string;
  type: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url: string | null;
  tags: string | null;
  created_at: string;
};

const DB_PATH = path.join(process.cwd(), ".data", "admin-content.sqlite");

let dbInstance: Database.Database | null = null;

const getDb = () => {
  if (dbInstance) return dbInstance;

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  dbInstance = new Database(DB_PATH);

  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS admin_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      tags TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return dbInstance;
};

const toItem = (row: AdminContentRow): AdminContentItem => ({
  id: String(row.id),
  section: row.section as AdminSection,
  type: row.type as AdminContentType,
  title: row.title,
  description: row.description,
  url: row.url,
  thumbnailUrl: row.thumbnail_url ?? undefined,
  tags: row.tags ? JSON.parse(row.tags) : [],
  createdAt: row.created_at,
});

export const getAllAdminContent = (): AdminContentItem[] => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM admin_content ORDER BY datetime(created_at) DESC, id DESC")
    .all() as AdminContentRow[];

  return rows.map(toItem);
};

export const getAdminContentBySection = (section: AdminSection): AdminContentItem[] => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM admin_content WHERE section = ? ORDER BY datetime(created_at) DESC, id DESC")
    .all(section) as AdminContentRow[];

  return rows.map(toItem);
};

export const getAdminContentById = (id: string): AdminContentItem | null => {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;

  const db = getDb();
  const row = db.prepare("SELECT * FROM admin_content WHERE id = ?").get(numericId) as AdminContentRow | undefined;

  return row ? toItem(row) : null;
};

export const createAdminContent = (input: {
  section: AdminSection;
  type: AdminContentType;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  tags?: string[];
}) => {
  const db = getDb();
  db.prepare(
    `
      INSERT INTO admin_content (section, type, title, description, url, thumbnail_url, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    input.section,
    input.type,
    input.title,
    input.description,
    input.url,
    input.thumbnailUrl ?? null,
    JSON.stringify(input.tags ?? [])
  );
};

export const deleteAdminContentById = (id: string) => {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return;

  const db = getDb();
  db.prepare("DELETE FROM admin_content WHERE id = ?").run(numericId);
};
