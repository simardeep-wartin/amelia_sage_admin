import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    const raw = await apiClient.get(ENDPOINTS.wealthPlans.exercises(id), {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);

  try {
    const raw = await apiClient.post(ENDPOINTS.wealthPlans.exercises(id), body, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
