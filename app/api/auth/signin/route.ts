import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signInSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const { email } = parsed.data;
  const token = "mock-token";

  const response = NextResponse.json({
    token,
    message: "Signed in successfully.",
    user: { id: "admin_1", fullName: "Admin", email },
  });

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
