"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validators";
import Button from "@/components/ui/Button";
import AuthSuccessModal from "@/components/auth/AuthSuccessModal";

function PasswordInput({
  label,
  placeholder,
  hint,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  hint?: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px] font-normal leading-[1.3] text-[#2b2b2b]">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...props}
          className="h-[48px] w-full rounded-[20px] border border-[#ededed] bg-white px-5 pr-12 py-3 text-[16px] font-medium text-[#2b2b2b] placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c6c6c] hover:text-[#2b2b2b] transition-colors cursor-pointer"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
        </button>
      </div>
      {hint && !error && (
        <p className="text-[12px] font-normal leading-[1.3] text-[#6c6c6c]">{hint}</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onBlur",
  });

  async function onSubmit(_values: ResetPasswordFormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setShowSuccess(true);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    router.push("/signin");
  }

  return (
    <>
      <div className="w-full flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1
            className="inline-block font-cormorant text-xxxl font-semibold tracking-normal bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #8BAA87 0%, #D6B26A 100%)" }}
          >
            Amelia Sage
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-[20px] font-semibold leading-[1.5] text-gold">Reset Password</p>
            <p className="text-[14px] font-normal leading-[1.3] text-[#2b2b2b]">
              Set a new secure password to regain access to your account.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            hint="Use at least 8 characters with uppercase, lowercase, a number, and a special character."
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <Button type="submit" size="full" isLoading={isLoading}>
              Reset Password
            </Button>
            <Link
              href="/signin"
              className="text-center text-[12px] font-medium text-[#3b82f6] hover:underline leading-[1.3]"
            >
              Go back to Sign in
            </Link>
          </div>
        </form>
      </div>

      <AuthSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Password Reset Successful"
        message="Your new password is now active. You'll be redirected to the login screen to sign in again."
      />
    </>
  );
}
