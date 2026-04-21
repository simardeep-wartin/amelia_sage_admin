"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "@/lib/validators";
import { signupApi } from "@/Services/services/auth-api";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const defaultValues: SignupFormValues = { fullName: "", email: "", password: "" };

export default function SignupPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: SignupFormValues) {
    try {
      const result = await signupApi(values);
      setAuth(result.token, result.user);
      router.push("/dashboard");
    } catch (e) {
      setError("root", {
        message: e instanceof Error ? e.message : "Unable to sign up right now.",
      });
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-6 py-12">
      <section className="w-full rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sign up to access the admin panel.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            autoComplete="name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {errors.root ? (
            <p className="text-sm text-red-600">{errors.root.message}</p>
          ) : null}

          <Button type="submit" isLoading={isSubmitting}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium underline">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
