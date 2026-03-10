import { cookies } from "next/headers";

export const ADMIN_COOKIE = "wolf-admin-session";
const ADMIN_COOKIE_VALUE = "active";
const ADMIN_PASSWORD = "Aa@1Stephen";

export const validateAdminPassword = (password: string) => password === ADMIN_PASSWORD;

export const isAdminAuthenticated = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_COOKIE_VALUE;
};

export const setAdminSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
};

export const clearAdminSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
};
