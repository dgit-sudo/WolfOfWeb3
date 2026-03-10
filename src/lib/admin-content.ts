export type AdminSection = "marketing" | "video" | "web" | "web3";
export type AdminContentType = "video" | "website" | "custom";

export type AdminContentItem = {
  id: string;
  section: AdminSection;
  type: AdminContentType;
  title: string;
  description: string;
  url: string;
  thumbnailUrl?: string;
  tags?: string[];
  createdAt: string;
};

export const isScreenPalId = (value: string) => /^[A-Za-z0-9]{11}$/.test(value);

export const isUploadedAssetPath = (value: string) => value.startsWith("/admin-uploads/");

export const isVideoFilePath = (value: string) => /\.(mp4|webm|ogg|mov|m4v)$/i.test(value);

export const isImageFilePath = (value: string) => /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(value);

export const isRenderableVideo = (value: string) => isScreenPalId(value) || isVideoFilePath(value);

export const isAdminSection = (value: string): value is AdminSection =>
  value === "marketing" || value === "video" || value === "web" || value === "web3";

export const isAdminContentType = (value: string): value is AdminContentType =>
  value === "video" || value === "website" || value === "custom";
