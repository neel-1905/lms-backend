import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { AssignPermissionsInput, CreateRoleInput } from "./role.validation";

type CreateRoleServiceInput = CreateRoleInput & {
  organizationId: string;
};

export async function createRole(data: CreateRoleServiceInput) {
  const existingRole = await prisma.role.findFirst({
    where: {
      organizationId: data.organizationId,
      name: data.name,
    },
  });

  if (existingRole) throw new AppError("Role already exists", 409);

  const role = await prisma.role.create({
    data: {
      name: data.name,
      description: data.description,
      organizationId: data.organizationId,
    },
  });

  return role;
}

type AssignPermissionsServiceInput = AssignPermissionsInput & {
  roleId: string;
  organizationId: string;
};

export async function assignPermissionsToRole(
  data: AssignPermissionsServiceInput,
) {
  const role = await prisma.role.findFirst({
    where: {
      id: data.roleId,
      organizationId: data.organizationId,
    },
  });

  if (!role) throw new AppError("Role not found", 404);

  const permissions = await prisma.permission.findMany({
    where: {
      id: {
        in: data.permissionIds,
      },
    },
  });

  if (permissions.length !== data.permissionIds.length)
    throw new AppError("Some permissions are invalid", 400);

  await prisma.rolePermission.createMany({
    data: permissions.map((permission) => ({
      roleId: role.id,
      permissionId: permission.id,
    })),
    skipDuplicates: true,
  });

  return { success: true };
}

export async function getRoles(organizationId: string) {
  const roles = await prisma.role.findMany({
    where: {
      organizationId,
    },

    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return roles;
}

type UpdateRolePermissionsInput = {
  roleId: string;

  organizationId: string;

  permissionIds: string[];
};
export async function updateRolePermissions(data: UpdateRolePermissionsInput) {
  const role = await prisma.role.findFirst({
    where: {
      id: data.roleId,

      organizationId: data.organizationId,
    },
  });

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  const permissions = await prisma.permission.findMany({
    where: {
      id: {
        in: data.permissionIds,
      },
    },
  });

  if (permissions.length !== data.permissionIds.length) {
    throw new AppError("Some permissions are invalid", 400);
  }

  await prisma.$transaction(async (tx) => {
    // Remove old permissions
    await tx.rolePermission.deleteMany({
      where: {
        roleId: role.id,
      },
    });

    // Add new permissions
    await tx.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: role.id,

        permissionId: permission.id,
      })),
    });
  });

  return {
    success: true,
  };
}
