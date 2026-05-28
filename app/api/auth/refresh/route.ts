import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = (await cookies()).get("refresh-token")?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token." }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${refreshToken}`,
        ...(process.env.ADMIN_API_KEY ? { "x-api-key": process.env.ADMIN_API_KEY } : {}),
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      console.error("[refresh] FastAPI rejected:", res.status, err);
      return NextResponse.json(
        { message: (err as { message?: string })?.message ?? "Refresh failed." },
        { status: 401 },
      );
    }

    const raw = (await res.json()) as { data: { access_token: string; expires_in: number } };

    const response = NextResponse.json({ message: "Token refreshed." });
    response.cookies.set("auth-token", raw.data.access_token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: raw.data.expires_in,
    });
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    console.error("[refresh] Error:", message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
