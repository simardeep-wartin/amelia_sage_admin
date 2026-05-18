import SignInLayout from "@/components/auth/SignInLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <SignInLayout animationPath="/auth/animation.json">
      <ResetPasswordForm />
    </SignInLayout>
  );
}
