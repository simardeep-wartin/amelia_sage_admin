import SignInLayout from "@/components/auth/SignInLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <>
      <link rel="preload" as="fetch" href="/auth/Amelia_Sage.json" crossOrigin="anonymous" />
      <SignInLayout animationPath="/auth/Amelia_Sage.json">
        <SignInForm />
      </SignInLayout>
    </>
  );
}
