// TODO: [DEAD CODE] This route is never called from the frontend — navigation is consumed
// directly from Services/navigationService.ts. Remove once confirmed unnecessary.
import { getNavigationPayload } from "@/Services/navigationService";

export function GET() {
  return Response.json(getNavigationPayload());
}
