import SignInLayout from "@/components/auth/SignInLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <SignInLayout animationPath="/auth/animation.svg">
      <ForgotPasswordForm />
    </SignInLayout>
  );
}
