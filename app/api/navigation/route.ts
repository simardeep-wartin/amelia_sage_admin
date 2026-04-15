import { getNavigationPayload } from "@/Services/controllers/navigation-controller";

export function GET() {
  return Response.json(getNavigationPayload());
}
