import prisma from "../../src/lib/prisma";
import { PERMISSIONS } from "../../src/constants/permissions";

async function main() {
  const permissions = [
    {
      name: PERMISSIONS.ORGANIZATION_MANAGE,

      description: "Manage organization settings",
    },

    {
      name: PERMISSIONS.ROLE_MANAGE,

      description: "Manage organization roles",
    },

    {
      name: PERMISSIONS.MEMBER_INVITE,

      description: "Invite organization members",
    },

    {
      name: PERMISSIONS.COURSE_CREATE,

      description: "Create courses",
    },

    {
      name: PERMISSIONS.COURSE_UPDATE,

      description: "Update courses",
    },

    {
      name: PERMISSIONS.COURSE_DELETE,

      description: "Delete courses",
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        name: permission.name,
      },

      update: {},

      create: permission,
    });
  }

  console.log("Permissions seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
