const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "yg@dmin#123";
const ADMIN_TOKEN = `yg-admin-${Buffer.from(ADMIN_PASSWORD).toString("base64")}`;

export function verifyAdminCredentials(username: string, password: string): boolean {
  return username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function getAdminToken(): string {
  return ADMIN_TOKEN;
}

export function isValidAdminToken(token: string | null | undefined): boolean {
  return !!token && token === ADMIN_TOKEN;
}
