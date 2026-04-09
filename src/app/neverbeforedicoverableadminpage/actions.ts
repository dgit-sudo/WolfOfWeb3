"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminContentType, isAdminSection } from "@/lib/admin-content";
import { clearAdminSessionCookie, isAdminAuthenticated, setAdminSessionCookie, validateAdminPassword } from "@/lib/admin-auth";
import { createAdminContent, deleteAdminContentById, getAdminContentById } from "@/lib/admin-db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-uploads");
const SUPABASE_BUCKET = "admin-uploads";

const sanitizeName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "upload";

const getSupabaseStorageClient = () => {
  const dbUrl = process.env.DATABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!dbUrl || !serviceRoleKey) return null;

  try {
    const parsed = new URL(dbUrl);
    const username = decodeURIComponent(parsed.username || "");
    const refFromUser = username.includes(".") ? username.split(".")[1] : "";
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF || refFromUser;
    if (!projectRef) return null;

    const supabaseUrl = `https://${projectRef}.supabase.co`;
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch {
    return null;
  }
};

const saveUploadedFile = async (file: File) => {
  const originalName = "name" in file ? file.name : "upload.bin";
  const extension = path.extname(originalName) || ".bin";
  const fileName = `${Date.now()}-${sanitizeName(path.basename(originalName, extension))}${extension.toLowerCase()}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = getSupabaseStorageClient();
  if (supabase) {
    const objectPath = `videos/${fileName}`;
    const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(objectPath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

    if (!error) {
      const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
      if (data.publicUrl) return data.publicUrl;
    }
  }

  // Local fallback for environments where Supabase storage credentials are not configured.
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, fileName);

  await fs.writeFile(filePath, buffer);
  return `/admin-uploads/${fileName}`;
};

const extractSupabaseObjectPath = (url: string): string | null => {
  const marker = `/storage/v1/object/public/${SUPABASE_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const objectPath = url.slice(idx + marker.length).split("?")[0];
  return objectPath || null;
};

const deleteUploadedFile = async (url: string) => {
  const objectPath = extractSupabaseObjectPath(url);
  if (objectPath) {
    const supabase = getSupabaseStorageClient();
    if (supabase) {
      await supabase.storage.from(SUPABASE_BUCKET).remove([objectPath]);
      return;
    }
  }

  if (!url.startsWith("/admin-uploads/")) return;

  const filePath = path.join(process.cwd(), "public", url.replace(/^\//, ""));

  try {
    await fs.unlink(filePath);
  } catch {
    // Best effort cleanup for deleted DB items.
  }
};

const revalidateAllContentPaths = () => {
  revalidatePath("/");
  revalidatePath("/marketing");
  revalidatePath("/video");
  revalidatePath("/web");
  revalidatePath("/web3");
  revalidatePath("/blog");
  revalidatePath("/neverbeforedicoverableadminpage");
};

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!validateAdminPassword(password)) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-password");
  }

  await setAdminSessionCookie();
  redirect("/neverbeforedicoverableadminpage");
}

export async function logoutAdmin() {
  await clearAdminSessionCookie();
  redirect("/neverbeforedicoverableadminpage");
}

export async function addAdminContentAction(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/neverbeforedicoverableadminpage");
  }

  const section = String(formData.get("section") ?? "");
  const type = String(formData.get("type") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const inputUrl = String(formData.get("url") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const thumbnailUrl = String(formData.get("thumbnailUrl") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const file = formData.get("file");

  const hasUploadedFile = file instanceof File && file.size > 0;
  const hasInputUrl = !!inputUrl;
  const isVideoSection = section === "marketing" || section === "video";
  const isBlog = type === "blog";
  const needsTitleAndDescription = section === "web" || section === "web3" || section === "blog";

  if (!isAdminSection(section) || !isAdminContentType(type)) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-input");
  }

  if (needsTitleAndDescription && (!title || !description)) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-input");
  }

  // Marketing/Video must receive exactly one source: URL xor uploaded file.
  if (isVideoSection) {
    if ((hasInputUrl && hasUploadedFile) || (!hasInputUrl && !hasUploadedFile)) {
      redirect("/neverbeforedicoverableadminpage?error=invalid-input");
    }
  }

  if (!isBlog && !isVideoSection && !hasInputUrl) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-input");
  }

  let url = inputUrl;
  if (hasUploadedFile && file instanceof File) {
    try {
      url = await saveUploadedFile(file);
    } catch {
      redirect("/neverbeforedicoverableadminpage?error=upload-failed");
    }
  }

  await createAdminContent({
    section,
    type,
    title,
    description,
    url: url || "", // Blog posts can have empty URL
    content: content || undefined,
    thumbnailUrl: thumbnailUrl || undefined,
    tags: tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  revalidateAllContentPaths();
  redirect("/neverbeforedicoverableadminpage?success=created");
}

export async function deleteAdminContentAction(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/neverbeforedicoverableadminpage");
  }

  const id = String(formData.get("id") ?? "");
  if (id) {
    const existing = await getAdminContentById(id);
    await deleteAdminContentById(id);
    if (existing) {
      await deleteUploadedFile(existing.url);
    }
    revalidateAllContentPaths();
  }

  redirect("/neverbeforedicoverableadminpage?success=deleted");
}
