import { z } from "zod";

// Used for any "thumbnail" layout modal (category, emotion, focus, plan, section, etc.)
export const thumbnailItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subtitle: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

// Used for any "media" layout modal (exercise, module, activity, session, etc.)
export const mediaItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
  videoFile: z.any().optional(),
  audioFile: z.any().optional(),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
});

export type ThumbnailItemFormData = z.infer<typeof thumbnailItemSchema>;
export type MediaItemFormData = z.infer<typeof mediaItemSchema>;
