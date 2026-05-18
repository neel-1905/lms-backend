import { PERMISSIONS_ARRAY } from "../../constants/permissions";
import prisma from "../../lib/prisma";

import { AppError } from "../../utils/AppError";

import { generateSlug } from "../../utils/generate-slug";

import { CreateOrganizationInput } from "./organization.validations";

type CreateOrganizationServiceInput = CreateOrganizationInput & {
  userId: string;
};

export async function createOrg(data: CreateOrganizationServiceInput) {
  const slug = generateSlug(data.organizationName);

  const existingOrganization = await prisma.organization.findUnique({
    where: {
      slug,
    },
  });

  if (existingOrganization)
    throw new AppError("Organization already exists", 409);

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create and organization
    const organization = await tx.organization.create({
      data: {
        name: data.organizationName,
        slug,
      },
    });

    // 2. Create OWNER role
    const ownerRole = await tx.role.create({
      data: {
        name: "OWNER",
        description: "Organization owner",
        organizationId: organization.id,
      },
    });

    // 3. Fetch permissions
    const ownerPermissions = await tx.permission.findMany({
      where: {
        name: {
          in: PERMISSIONS_ARRAY,
        },
      },
    });

    // 4. Assign Permissions
    await tx.rolePermission.createMany({
      data: ownerPermissions.map((permission) => ({
        roleId: ownerRole.id,
        permissionId: permission.id,
      })),
    });

    // 5. Create membership
    const membership = await tx.membership.create({
      data: {
        userId: data.userId,
        organizationId: organization.id,
      },
    });

    // 6. Assign OWNER role
    await tx.membershipRole.create({
      data: {
        membershipId: membership.id,
        roleId: ownerRole.id,
      },
    });

    return organization;
  });

  return result;
}
