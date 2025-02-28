import { Request, Response } from "express";
import { prismaClient } from "../config/prisma";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { generateToken } from "../utils/generate-token";
import { verifyToken } from "../utils/verify-token";
import {
  requestPasswordReset,
  resetPasswordWithToken,
} from "../utils/reset-password";
import { sendVerificationEmail } from "../utils/nodemailer";
import {
  generateVerificationToken,
  verifyEmailToken,
} from "../utils/verfiy-email";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const validUser = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });
    if (validUser) {
      res.status(403).json({
        message:
          "User already exists. Please choose a different email or username",
      });
      return;
    }

    await prismaClient.user.create({
      data: {
        username: username,
        email: email,
        password: hashSync(password, genSaltSync(12)),
      },
    });

    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    res.status(201).json({
      message:
        "Registration successful! Please check your email to verify your account",
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.split(" ")[1].startsWith("Bearer ")) {
      res.status(401).json({ message: "Auth headers missing" });
      return;
    }
    const token = authHeaders.split(" ")[1];

    const { email, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not found with this email" });
      return;
    }

    if (!user.isVerified) {
      res.status(401).json({ message: "Please verify your email first" });
      return;
    }

    const result = verifyToken(token);
    if (result === null) {
      if (!compareSync(password, user.password)) {
        res.status(401).json({ message: "Invalid Password" });
        return;
      }
      const username = user.username;
      const newToken = generateToken(username, email);
      res.status(200).json({ user, newToken });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const user = await verifyEmailToken(token as string);

    const registerToken = generateToken(user.username, user.email);

    res.status(200).json({ user, registerToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resendVerification = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.isVerified) {
      res.status(400).json({ message: "Email already verified" });
      return;
    }

    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "Verification email resent" });
  } catch (error) {
    res.status(500).json({ message: "Error resending verification email" });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await requestPasswordReset(email);

    res.status(200).json({
      message:
        "If an account exists with this email, a password reset link has been sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing request" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    await resetPasswordWithToken(token, password);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Invalid request" });
  }
};
