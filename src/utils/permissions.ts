import prisma from "../lib/prisma";

export async function hasPermission(
  userId: string,
  organizationId: string,
  permissionName: string,
) {
  const membership = await prisma.membership.findFirst({
    where: {
      userId,
      organizationId,
    },

    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!membership) return false;

  for (const membershipRole of membership.roles) {
    const role = membershipRole.role;

    const hasRequiredPermission = role.permissions.some(
      (rolePermission) => rolePermission.permission?.name === permissionName,
    );

    if (hasRequiredPermission) return true;
  }

  return false;
}
