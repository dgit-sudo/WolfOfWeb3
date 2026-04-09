import { Pool } from "pg";
import type { AdminContentItem, AdminContentType, AdminSection } from "@/lib/admin-content";

const connectionString = process.env.DATABASE_URL;
const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    })
  : null;

let initPromise: Promise<void> | null = null;

const ensureSchema = async () => {
  if (!pool) return;

  if (!initPromise) {
    initPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS admin_content (
          id TEXT PRIMARY KEY,
          section TEXT NOT NULL,
          type TEXT NOT NULL,
          title TEXT NOT NULL DEFAULT '',
          description TEXT NOT NULL DEFAULT '',
          url TEXT NOT NULL DEFAULT '',
          content TEXT,
          thumbnail_url TEXT,
          tags JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
    })();
  }

  await initPromise;
};

type DbRow = {
  id: string;
  section: AdminSection;
  type: AdminContentType;
  title: string;
  description: string;
  url: string;
  content: string | null;
  thumbnail_url: string | null;
  tags: unknown;
  created_at: string;
};

const mapRow = (row: DbRow): AdminContentItem => ({
  id: row.id,
  section: row.section,
  type: row.type,
  title: row.title,
  description: row.description,
  url: row.url,
  content: row.content ?? undefined,
  thumbnailUrl: row.thumbnail_url ?? undefined,
  tags: Array.isArray(row.tags) ? row.tags.filter((tag): tag is string => typeof tag === "string") : [],
  createdAt: row.created_at,
});

export const getAllAdminContent = async (): Promise<AdminContentItem[]> => {
  if (!pool) return [];
  await ensureSchema();
  const { rows } = await pool.query<DbRow>(
    `
      SELECT id, section, type, title, description, url, content, thumbnail_url, tags, created_at
      FROM admin_content
      ORDER BY created_at DESC
    `
  );
  return rows.map(mapRow);
};

export const getAdminContentBySection = async (section: AdminSection): Promise<AdminContentItem[]> => {
  if (!pool) return [];
  await ensureSchema();
  const { rows } = await pool.query<DbRow>(
    `
      SELECT id, section, type, title, description, url, content, thumbnail_url, tags, created_at
      FROM admin_content
      WHERE section = $1
      ORDER BY created_at DESC
    `,
    [section]
  );
  return rows.map(mapRow);
};

export const getAdminContentById = async (id: string): Promise<AdminContentItem | null> => {
  if (!pool) return null;
  await ensureSchema();
  const { rows } = await pool.query<DbRow>(
    `
      SELECT id, section, type, title, description, url, content, thumbnail_url, tags, created_at
      FROM admin_content
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  );

  return rows.length > 0 ? mapRow(rows[0]) : null;
};

export const createAdminContent = async (input: {
  section: AdminSection;
  type: AdminContentType;
  title: string;
  description: string;
  url: string;
  content?: string;
  thumbnailUrl?: string;
  tags?: string[];
}): Promise<void> => {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured. Set it to your Supabase Postgres connection string.");
  }

  await ensureSchema();

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await pool.query(
    `
      INSERT INTO admin_content (id, section, type, title, description, url, content, thumbnail_url, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
    `,
    [
      id,
      input.section,
      input.type,
      input.title,
      input.description,
      input.url,
      input.content ?? null,
      input.thumbnailUrl ?? null,
      JSON.stringify(input.tags ?? []),
    ]
  );
};

export const deleteAdminContentById = async (id: string): Promise<void> => {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured. Set it to your Supabase Postgres connection string.");
  }

  await ensureSchema();
  await pool.query(`DELETE FROM admin_content WHERE id = $1`, [id]);
};
