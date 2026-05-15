import dotenv from "dotenv";

dotenv.config();

type EnvConfig = {
  DATABASE_URL: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
};

const envConfig: EnvConfig = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
  JWT_SECRET: process.env.JWT_SECRET!,
};

export default envConfig;
