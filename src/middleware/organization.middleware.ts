import { NextFunction, Request, Response } from "express";

import prisma from "../lib/prisma";

import { AppError } from "../utils/AppError";

export async function loadOrganizationContext(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const organizationId = req.params.organizationId as string;

    if (!organizationId) throw new AppError("Organization ID is required", 400);

    const userId = req.user?.id;

    if (!userId) throw new AppError("Unauthorized", 401);

    // 1. Check if org exists

    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) throw new AppError("Unauthorized", 401);

    // 2. Find membership
    const membership = await prisma.membership.findFirst({
      where: {
        userId,
        organizationId,
      },
    });

    if (!membership)
      throw new AppError("You are not a member of this organization", 403);

    // 3. Attach context
    req.organization = organization;
    req.membership = membership;

    next();
  } catch (error) {
    next(error);
  }
}
