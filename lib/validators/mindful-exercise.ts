import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  subtitle: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export const exerciseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
  videoFile: z.any().optional(),
  audioFile: z.any().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export const emotionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subtitle: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export const focusSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subtitle: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
export type ExerciseFormData = z.infer<typeof exerciseSchema>;
export type EmotionFormData = z.infer<typeof emotionSchema>;
export type FocusFormData = z.infer<typeof focusSchema>;
