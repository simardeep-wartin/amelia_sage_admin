import SignInLayout from "@/components/auth/SignInLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <link rel="preload" as="fetch" href="/auth/Amelia_Sage.json" crossOrigin="anonymous" />
      <SignInLayout animationPath="/auth/Amelia_Sage.json">
        <ForgotPasswordForm />
      </SignInLayout>
    </>
  );
}
