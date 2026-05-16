import jwt from "jsonwebtoken";
import envConfig from "../config/env-config";

export function generateAccessToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    envConfig.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, envConfig.JWT_SECRET) as { userId: string };
}
