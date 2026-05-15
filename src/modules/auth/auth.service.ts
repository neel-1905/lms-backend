import { AuthProvider } from "../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { RegisterInput } from "./auth.validation";
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
