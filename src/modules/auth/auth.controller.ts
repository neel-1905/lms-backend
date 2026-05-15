import { NextFunction, Request, Response } from "express";
import { registerSchema } from "./auth.validation";
import { registerUser } from "./auth.service";

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
