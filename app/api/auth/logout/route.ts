import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ENDPOINTS } from "@/lib/endpoints";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No session." }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}${ENDPOINTS.auth.logout}`, {
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
      return NextResponse.json(
        { message: (err as { message?: string })?.message ?? "Logout failed." },
        { status: res.status },
      );
    }

    // FastAPI confirmed logout — now clear cookies
    const response = NextResponse.json({ message: "Logged out." });
    response.cookies.set("auth-token", "", { maxAge: 0, path: "/" });
    response.cookies.set("refresh-token", "", { maxAge: 0, path: "/" });
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
