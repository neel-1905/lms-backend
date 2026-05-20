import { z } from "zod";

export const createRoleSchema = z.object({
  name: z
    .string({
      error: "Role name is required",
    })
    .min(2, "Role name must be at least 2 characters")
    .max(50, "Role name is too long"),

  description: z.string().optional(),
});

export const assignPermissionsSchema = z.object({
  permissionIds: z
    .array(z.uuid(), "permissionIds must be an array")
    .min(1, "At least one permission is required"),
});

export type AssignPermissionsInput = z.infer<typeof assignPermissionsSchema>;

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
