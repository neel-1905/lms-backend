import { NextFunction, Request, Response } from "express";

import { success, ZodError } from "zod";

import { AppError } from "../utils/AppError";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    const formattedErrors: Record<string, string> = {};

    error.issues.forEach((issue) => {
      const field = issue.path[0] as string;

      formattedErrors[field] = issue.message;
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
