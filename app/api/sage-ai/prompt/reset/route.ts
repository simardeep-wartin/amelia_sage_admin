import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function POST() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  try {
    const raw = await apiClient.post(ENDPOINTS.sageAi.resetPrompt, undefined, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
