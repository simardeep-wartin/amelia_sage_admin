import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/validators/auth";
import { apiClient } from "@/lib/apiClient";
import { ENDPOINTS } from "@/lib/endpoints";
import { auth } from "@/lib/payloads";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signInSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  try {
    const raw = (await apiClient.post(
      ENDPOINTS.auth.login,
      auth.login(parsed.data.email, parsed.data.password),
      {
        apiKey: process.env.ADMIN_API_KEY,
      },
    )) as {
      message: string;
      data: { access_token: string; refresh_token: string; expires_in: number };
    };

    const response = NextResponse.json({
      token: raw.data.access_token,
      message: raw.message,
      user: { id: parsed.data.email, email: parsed.data.email, fullName: parsed.data.email },
    });

    response.cookies.set("auth-token", raw.data.access_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: raw.data.expires_in,
    });
    response.cookies.set("refresh-token", raw.data.refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
