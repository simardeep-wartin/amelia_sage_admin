import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id } = await params;

  try {
    const raw = await apiClient.delete(ENDPOINTS.workOnMe.focusArea(id), {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw ?? { success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
