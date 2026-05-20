import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { AddMemberInput } from "./member.validation";

export async function addMember(data: AddMemberInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  const existingMembership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
      organizationId: data.organizationId,
    },
  });

  if (existingMembership) throw new AppError("User is already a member", 409);

  const role = await prisma.role.findFirst({
    where: {
      id: data.roleId,
      organizationId: data.organizationId,
    },
  });

  if (!role) throw new AppError("Role not found", 404);

  const result = await prisma.$transaction(async (tx) => {
    const membership = await prisma.membership.create({
      data: {
        organizationId: data.organizationId,
        userId: user.id,
      },
    });

    await tx.membershipRole.create({
      data: {
        membershipId: membership.id,
        roleId: data.roleId,
      },
    });

    return membership;
  });

  return result;
}
