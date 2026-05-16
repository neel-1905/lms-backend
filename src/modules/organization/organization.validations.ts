import { z } from "zod";

export const createOrganizationSchema = z.object({
  organizationName: z
    .string({
      error: "Organization name is required",
    })
    .min(2, "Organization name must be at least 2 characters")
    .max(50, "Organization name is too long"),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
