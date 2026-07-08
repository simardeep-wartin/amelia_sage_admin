import { Suspense } from "react";
import SignInLayout from "@/components/auth/SignInLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <link rel="preload" as="fetch" href="/auth/Amelia_Sage.json" crossOrigin="anonymous" />
      <SignInLayout animationPath="/auth/Amelia_Sage.json" loaderVariant="reset-password">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </SignInLayout>
    </>
  );
}
