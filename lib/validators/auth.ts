import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must include an uppercase letter.")
      .regex(/[a-z]/, "Must include a lowercase letter.")
      .regex(/[0-9]/, "Must include a number.")
      .regex(/[^A-Za-z0-9]/, "Must include a special character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
