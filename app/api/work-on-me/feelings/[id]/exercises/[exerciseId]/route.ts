import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; exerciseId: string }> },
) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id, exerciseId } = await params;
  const body = await req.json();

  try {
    const raw = await apiClient.put(ENDPOINTS.workOnMe.feelingExercise(id, exerciseId), body, {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; exerciseId: string }> },
) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const { id, exerciseId } = await params;

  try {
    const raw = await apiClient.delete(ENDPOINTS.workOnMe.feelingExercise(id, exerciseId), {
      token,
      apiKey: process.env.ADMIN_API_KEY,
    });
    return NextResponse.json(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
