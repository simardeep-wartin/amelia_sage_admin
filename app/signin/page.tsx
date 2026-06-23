import SignInLayout from "@/components/auth/SignInLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <>
      <link rel="preload" as="image" href="/auth/animation.svg" />
      <SignInLayout animationPath="/auth/animation.svg">
        <SignInForm />
      </SignInLayout>
    </>
  );
}
