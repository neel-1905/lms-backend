import jwt from "jsonwebtoken";
import envConfig from "../config/env-config";

export function generateAccessToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    envConfig.JWT_SECRET!,
    {
      expiresIn: "15m",
    },
  );
}
