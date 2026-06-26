import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const incoming = await req.formData();
  const file = incoming.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file provided." }, { status: 400 });
  }

  const forward = new FormData();
  forward.append("file", file, file.name);

  try {
    // Raw fetch (not apiClient) so the multipart boundary is set automatically.
    const res = await fetch(`${process.env.BACKEND_URL}/uploads/image`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.ADMIN_API_KEY ?? "",
        Authorization: `Bearer ${token}`,
      },
      body: forward,
    });
    const raw = await res.json();
    return NextResponse.json(raw, { status: res.status });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
