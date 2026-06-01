import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validators";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8001";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY ?? "";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ADMIN_API_KEY,
    },
    body: JSON.stringify({ email: parsed.data.email }),
  });

  const data = (await res.json().catch(() => null)) as { message?: string } | null;

  if (!res.ok) {
    return NextResponse.json(
      { message: data?.message ?? "Something went wrong." },
      { status: res.status },
    );
  }

  return NextResponse.json({ message: data?.message ?? "Reset link sent." });
}
