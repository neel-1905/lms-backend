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
    const organization = await tx.organization.create({
      data: {
        name: data.organizationName,
        slug,
      },
    });

    const membership = await tx.membership.create({
      data: {
        userId: data.userId,
        organizationId: organization.id,
      },
    });

    const ownerRole = await tx.role.create({
      data: {
        name: "OWNER",
        description: "Organization owner",
        organizationId: organization.id,
      },
    });

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
