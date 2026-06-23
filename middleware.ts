import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup", "/auth"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

async function tryRefresh(
  refreshToken: string,
): Promise<{ accessToken: string; expiresIn: number } | null> {
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
    if (!res.ok) return null;
    const data = (await res.json()) as { data: { access_token: string; expires_in: number } };
    return { accessToken: data.data.access_token, expiresIn: data.data.expires_in };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    const isAsset = /\.[^/]+$/.test(pathname);
    if (!isAsset) {
      const accessToken = request.cookies.get("auth-token")?.value;
      const refreshToken = request.cookies.get("refresh-token")?.value;
      if (accessToken || refreshToken) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        url.searchParams.delete("from");
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("auth-token")?.value;

  // Access token present — let the request through with no-cache headers
  if (accessToken) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    return response;
  }

  // Access token missing — try to silently refresh using the refresh token
  const refreshToken = request.cookies.get("refresh-token")?.value;

  if (refreshToken) {
    const refreshed = await tryRefresh(refreshToken);
    if (refreshed) {
      const response = NextResponse.next();
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
      response.cookies.set("auth-token", refreshed.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: refreshed.expiresIn,
      });
      return response;
    }
  }

  // No valid token and refresh failed — send to sign in
  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
