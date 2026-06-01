import { Suspense } from "react";
import SignInLayout from "@/components/auth/SignInLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <SignInLayout animationPath="/auth/animation.json">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </SignInLayout>
  );
}
