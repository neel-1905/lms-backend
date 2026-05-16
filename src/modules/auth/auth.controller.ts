import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./auth.validation";
import { loginUser, refreshAccessToken, registerUser } from "./auth.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      data: user,
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const data = await loginUser(validatedData);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);

    const data = await refreshAccessToken(validatedData.refreshToken);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
}
