"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminContentType, isAdminSection } from "@/lib/admin-content";
import { clearAdminSessionCookie, isAdminAuthenticated, setAdminSessionCookie, validateAdminPassword } from "@/lib/admin-auth";
import { createAdminContent, deleteAdminContentById, getAdminContentById } from "@/lib/admin-db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-uploads");

const sanitizeName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "upload";

const saveUploadedFile = async (file: File) => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const originalName = "name" in file ? file.name : "upload.bin";
  const extension = path.extname(originalName) || ".bin";
  const fileName = `${Date.now()}-${sanitizeName(path.basename(originalName, extension))}${extension.toLowerCase()}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filePath, buffer);
  return `/admin-uploads/${fileName}`;
};

const deleteUploadedFile = async (url: string) => {
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
  const thumbnailUrl = String(formData.get("thumbnailUrl") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const file = formData.get("file");

  let url = inputUrl;

  if (file instanceof File && file.size > 0) {
    url = await saveUploadedFile(file);
  }

  if (!isAdminSection(section) || !isAdminContentType(type) || !title || !description || !url) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-input");
  }

  createAdminContent({
    section,
    type,
    title,
    description,
    url,
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
    const existing = getAdminContentById(id);
    deleteAdminContentById(id);
    if (existing) {
      await deleteUploadedFile(existing.url);
    }
    revalidateAllContentPaths();
  }

  redirect("/neverbeforedicoverableadminpage?success=deleted");
}
