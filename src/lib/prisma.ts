import { PrismaPg } from "@prisma/adapter-pg";
import envConfig from "../config/env-config";
import { PrismaClient } from "../generated/prisma/client";

const CONNECTION_URL = envConfig.DATABASE_URL;

const adapter = new PrismaPg({ connectionString: CONNECTION_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
