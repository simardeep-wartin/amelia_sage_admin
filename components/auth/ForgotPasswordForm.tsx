"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validators";
import Button from "@/components/ui/Button";
import ResetLinkSentModal from "@/components/auth/ResetLinkSentModal";

export default function ForgotPasswordForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message ?? "Something went wrong.");
      }
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
            <p className="text-[20px] font-semibold leading-[1.5] text-gold">Forgot Password</p>
            <p className="text-[14px] font-normal leading-[1.3] text-[#2b2b2b]">
              Enter your registered email address and we&apos;ll send you a password reset link.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-normal leading-[1.3] text-[#2b2b2b]">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              {...register("email")}
              className="h-[48px] w-full rounded-[20px] border border-[#ededed] bg-white px-5 py-3 text-[16px] font-medium text-[#2b2b2b] placeholder:text-[#e1e1e1] outline-none transition focus:border-sageGreen/55 focus:ring-2 focus:ring-sageGreen/20"
            />
            {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button type="submit" size="full" isLoading={isLoading}>
              Send Reset Link
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

      <ResetLinkSentModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  );
}
