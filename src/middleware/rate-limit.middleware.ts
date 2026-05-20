import { NextFunction, Request, Response } from "express";

import redis from "../lib/redis";

import { AppError } from "../utils/AppError";

type RateLimitOptions = {
  windowInSeconds: number;
  maxRequests: number;
};

export function rateLimit(options: RateLimitOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip || "Unknown IP";

      const key = `rate-limit:${ip}`;

      const currentRequests = await redis.incr(key);

      if (currentRequests === 1)
        await redis.expire(key, options.windowInSeconds);

      if (currentRequests > options.maxRequests)
        throw new AppError("Too many requests. Please try again later.", 429);

      next();
    } catch (error) {
      next(error);
    }
  };
}
