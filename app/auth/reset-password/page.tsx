import { Suspense } from "react";
import SignInLayout from "@/components/auth/SignInLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <link rel="preload" as="video" href="/auth/bg-animaton.mp4" />
      <SignInLayout animationPath="/auth/bg-animaton.mp4">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </SignInLayout>
    </>
  );
}
