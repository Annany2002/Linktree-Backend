import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const VERIFICATION_TOKEN_EXPIRY = 60 * 60 * 1000;

export const generateVerificationToken = async (email: string) => {
  await prisma.user.update({
    where: { email },
    data: { verificationToken: null, verificationTokenExp: null },
  });

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { email },
    data: {
      verificationToken: token,
      verificationTokenExp: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY),
    },
  });

  return token;
};

export const verifyEmailToken = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExp: { gt: new Date() },
    },
  });

  if (!user) throw new Error("Invalid or expired token");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExp: null,
    },
  });

  return user;
};
