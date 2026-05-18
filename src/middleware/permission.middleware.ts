import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

import { hasPermission } from "../utils/permissions";

export function authorizePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const organizationId = req.params.organizationId;

      if (!userId) throw new AppError("Unauthorized", 401);

      if (!organizationId)
        throw new AppError("Organization ID is required", 400);

      const allowed = await hasPermission(
        userId,
        organizationId as string,
        permission,
      );

      if (!allowed) throw new AppError("Forbidden", 403);

      next();
    } catch (error) {
      next(error);
    }
  };
}
