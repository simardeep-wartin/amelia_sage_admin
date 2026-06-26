/**
 * Uploads an image File to S3 (via the backend) and returns its public CloudFront URL.
 * Replaces the old `URL.createObjectURL` blob URLs, which were never persisted.
 */
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/upload-image", { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message ?? "Image upload failed");
  }
  return json.data.image_url as string;
}
