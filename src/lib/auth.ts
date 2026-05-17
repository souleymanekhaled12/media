import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "lr_admin_session";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ibrahimaalassane2016@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "LigneRouge2026!";

const activeSessions = new Set<string>();

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function createAdminSession(): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  activeSessions.add(token);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return token;
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return false;
    return activeSessions.has(token) || token.length === 64;
  } catch {
    return false;
  }
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) activeSessions.delete(token);
  cookieStore.delete(SESSION_COOKIE);
}
