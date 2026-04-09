"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminContentType, isAdminSection } from "@/lib/admin-content";
import { clearAdminSessionCookie, isAdminAuthenticated, setAdminSessionCookie, validateAdminPassword } from "@/lib/admin-auth";
import { createAdminContent, deleteAdminContentById, getAdminContentById } from "@/lib/admin-db";

const deleteUploadedFile = async (_url: string) => {
  // Video uploads are URL-only now, so there is no upload artifact to delete.
  return;
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

  if (isVideoSection) {
    if (!hasInputUrl || hasUploadedFile) {
      redirect("/neverbeforedicoverableadminpage?error=invalid-input");
    }
  }

  if (!isBlog && !isVideoSection && !hasInputUrl) {
    redirect("/neverbeforedicoverableadminpage?error=invalid-input");
  }

  await createAdminContent({
    section,
    type,
    title,
    description,
    url: inputUrl || "", // Blog posts can have empty URL
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
