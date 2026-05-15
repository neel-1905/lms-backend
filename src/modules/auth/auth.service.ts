import { AuthProvider } from "../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { generateAccessToken } from "../../utils/jwt";
import { generateRefreshToken } from "../../utils/refresh-token";
import { LoginInput, RegisterInput } from "./auth.validation";
import bcrypt from "bcrypt";

export async function registerUser(data: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) throw new AppError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    await tx.authAccount.create({
      data: {
        userId: createdUser.id,
        provider: AuthProvider.EMAIL,
        providerAccountId: data.email,
        passwordHash: hashedPassword,
        verified: false,
      },
    });

    return createdUser;
  });

  return user;
}

export async function loginUser(data: LoginInput) {
  const authAccount = await prisma.authAccount.findFirst({
    where: {
      provider: AuthProvider.EMAIL,
      providerAccountId: data.email,
    },
    include: {
      user: true,
    },
  });

  if (!authAccount || !authAccount.passwordHash)
    throw new AppError("Invalid Credentials", 401);

  const isPasswordValid = await bcrypt.compare(
    data.password,
    authAccount.passwordHash,
  );

  if (!isPasswordValid) throw new AppError("Invalid Credentials", 401);

  const accessToken = generateAccessToken(authAccount.userId);

  const refreshToken = generateRefreshToken();

  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: authAccount.userId,
      expiresAt: refreshTokenExpiry,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: authAccount.user,
  };
}
