import { getNavigationPayload } from "@/Services/navigationService";

export function GET() {
  return Response.json(getNavigationPayload());
}
