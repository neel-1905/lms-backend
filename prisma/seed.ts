import prisma from "../src/lib/prisma";

async function main() {
  const organization = await prisma.organization.create({
    data: {
      name: "Default Organization",

      slug: "default-org",
    },
  });

  const roles = [
    {
      name: "SUPER_ADMIN",
      description: "Full platform access",
    },

    {
      name: "INSTRUCTOR",
      description: "Can manage courses",
    },

    {
      name: "STUDENT",
      description: "Can access enrolled courses",
    },

    {
      name: "TA",
      description: "Teaching assistant",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        organizationId_name: {
          organizationId: organization.id,

          name: role.name,
        },
      },

      update: {},

      create: {
        ...role,

        organizationId: organization.id,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
