import SignInLayout from "@/components/auth/SignInLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <>
      <link rel="preload" as="video" href="/auth/bg-animaton.mp4" />
      <SignInLayout animationPath="/auth/bg-animaton.mp4">
        <SignInForm />
      </SignInLayout>
    </>
  );
}
