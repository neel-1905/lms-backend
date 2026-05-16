import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email("Enter a valid email"),
  password: z
    .string("Password is required")
    .min(8, "Minimum 8 characters required")
    .max(16, "Maximum 16 characters required"),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z
    .string("Refresh token is required")
    .min(1, "Refresh token is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
