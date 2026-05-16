import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new AppError("Unauthorized", 401);

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) throw new AppError("User not found", 401);

    if (!user.isActive) throw new AppError("Account disabled", 403);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return next(new AppError("Access token expired", 401));

    if (error instanceof jwt.JsonWebTokenError)
      return next(new AppError("Invalid token", 401));

    next(error);
  }
}
