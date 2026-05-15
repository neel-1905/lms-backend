import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email("Enter a valid email"),
  password: z
    .string("Password is required")
    .min(8, "Minimum 8 characters required")
    .max(16, "Maximum 16 characters required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
