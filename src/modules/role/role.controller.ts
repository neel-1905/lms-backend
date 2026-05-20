import { NextFunction, Request, Response } from "express";
import { assignPermissionsSchema, createRoleSchema } from "./role.validation";
import {
  assignPermissionsToRole,
  createRole,
  getRoles,
  updateRolePermissions,
} from "./role.service";

export async function createRoleController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createRoleSchema.parse(req.body);

    const role = await createRole({
      ...validatedData,
      organizationId: req.organization!.id,
    });

    return res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    next(error);
  }
}

export async function assignPermissionsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = assignPermissionsSchema.parse(req.body);

    const data = await assignPermissionsToRole({
      roleId: req.params.roleId as string,

      organizationId: req.organization!.id,

      permissionIds: validatedData.permissionIds,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRolesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const roles = await getRoles(req.organization!.id);

    return res.status(200).json({
      success: true,

      data: roles,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRolePermissionsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = assignPermissionsSchema.parse(req.body);

    const data = await updateRolePermissions({
      roleId: req.params.roleId as string,
      organizationId: req.organization!.id,
      permissionIds: validatedData.permissionIds,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
