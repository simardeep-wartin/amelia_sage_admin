"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signInSchema, type SignInFormValues } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type SignInFormProps = {
  onSuccessRedirectTo?: string;
};

const defaultValues: SignInFormValues = {
  email: "",
  password: "",
};

export default function SignInForm({ onSuccessRedirectTo = "/dashboard" }: SignInFormProps) {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: SignInFormValues) {
    await signIn(values);
    router.push(onSuccessRedirectTo);
  }

  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <h1 className="inline-block bg-gradient-to-r from-primary to-gold bg-clip-text font-cormorant text-xxxl font-semibold tracking-normal text-transparent">
          Amelia Sage
        </h1>
        <p className="mt-4 text-l font-semibold text-gold">Admin Sign in</p>
        <p className="mt-1 text-s text-charcoal">Access your dashboard securely</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          autoComplete="current-password"
          error={errors.password?.message}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeIcon className="h-[18px] w-[18px] text-charcoal/70" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-[18px] w-[18px] text-charcoal/70" aria-hidden="true" />
              )}
            </button>
          }
          {...register("password")}
        />

        <div className="flex items-center justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-[#3b82f6] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error ? <p className="text-sm text-red-200">{error}</p> : null}

        <div className="pt-3">
          <Button type="submit" isLoading={isLoading}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
