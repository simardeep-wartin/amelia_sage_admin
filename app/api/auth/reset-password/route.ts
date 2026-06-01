import { NextResponse } from "next/server";
import { z } from "zod";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8001";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY ?? "";

const schema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY,
    },
    body: JSON.stringify(parsed.data),
  });

  const data = (await res.json().catch(() => null)) as { message?: string } | null;

  if (!res.ok) {
    return NextResponse.json(
      { message: data?.message ?? "Something went wrong." },
      { status: res.status },
    );
  }

  return NextResponse.json({ message: data?.message ?? "Password reset successfully." });
}
