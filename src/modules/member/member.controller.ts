import { NextFunction, Request, Response } from "express";
import { addMemberSchema } from "./member.validation";
import { addMember } from "./member.service";

export async function addMemberController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validated = addMemberSchema.parse({
      ...req.body,
      organizationId: req.organization!.id,
    });

    const member = await addMember(validated);

    return res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
}
