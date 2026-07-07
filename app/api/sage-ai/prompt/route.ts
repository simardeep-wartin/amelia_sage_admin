import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function GET() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  try {
    const raw = await apiClient.get(ENDPOINTS.sageAi.prompt, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);

  try {
    const raw = await apiClient.put(ENDPOINTS.sageAi.prompt, body, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
