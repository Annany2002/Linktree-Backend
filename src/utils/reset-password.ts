import { hashSync } from "bcryptjs";
import { prismaClient } from "../config/prisma";
import crypto from "crypto";
import { sendPasswordResetEmail } from "./nodemailer";

const RESET_TOKEN_EXPIRY = 60 * 60 * 1000;
export const generatePasswordResetToken = async (email: string) => {
  await prismaClient.passwordResetToken.deleteMany({
    where: { email },
  });

  const token = crypto.randomBytes(32).toString("hex");

  return prismaClient.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY),
    },
  });
};

export const requestPasswordReset = async (email: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) return;

  const resetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, resetToken.token);
};

export const resetPasswordWithToken = async (
  token: string,
  newPassword: string
) => {
  const resetToken = await prismaClient.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = hashSync(newPassword, 12);

  await prismaClient.$transaction([
    prismaClient.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    }),
    prismaClient.passwordResetToken.delete({ where: { id: resetToken.id } }),
  ]);
};
