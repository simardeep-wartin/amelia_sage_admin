import SignInLayout from "@/components/auth/SignInLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <link rel="preload" as="video" href="/auth/bg-animaton.mp4" />
      <SignInLayout animationPath="/auth/bg-animaton.mp4">
        <ForgotPasswordForm />
      </SignInLayout>
    </>
  );
}
