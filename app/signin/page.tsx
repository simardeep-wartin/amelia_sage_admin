import SignInLayout from "@/components/auth/SignInLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <SignInLayout animationPath="/auth/animation.json">
      <SignInForm />
    </SignInLayout>
  );
}
