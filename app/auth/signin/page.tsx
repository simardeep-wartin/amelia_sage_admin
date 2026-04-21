import { redirect } from "next/navigation";

export default function AuthSignInRedirectPage() {
  redirect("/signin");
}
