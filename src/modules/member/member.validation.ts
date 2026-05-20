import { z } from "zod";

export const addMemberSchema = z.object({
  email: z.email("Enter a valid email"),

  roleId: z.uuid("Valid role ID is required"),

  organizationId: z
    .string("organizationId is required")
    .min(1, "organizationId is required"),
});

export type AddMemberInput = z.infer<typeof addMemberSchema>;
