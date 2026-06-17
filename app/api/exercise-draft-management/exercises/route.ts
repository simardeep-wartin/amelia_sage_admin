import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function GET(request: Request) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const qs = searchParams.toString();
  const path = qs ? `${ENDPOINTS.journal.exercises}?${qs}` : ENDPOINTS.journal.exercises;

  try {
    const raw = await apiClient.get(path, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
