import { parseCookies } from "nookies";

export function getClientToken(ctx = null) {
  const cookies = parseCookies(ctx); // Automatically handles client or server context
  return cookies.access || null;
}
