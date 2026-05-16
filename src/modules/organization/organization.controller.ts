import { NextFunction, Request, Response } from "express";
import { createOrganizationSchema } from "./organization.validations";
import { createOrg } from "./organization.service";

export async function createOrganization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createOrganizationSchema.parse(req.body);

    const organization = await createOrg({
      ...validatedData,
      userId: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    next(error);
  }
}
