import { createClient } from "./supabase";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as any) || {}),
  };

  if (session) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json();
}

export const api = {
  therapists: {
    getVerified: () => fetchWithAuth("/therapists/verified"),
  }
};
