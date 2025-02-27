import { Request, Response } from "express";
import { prismaClient } from "../config/prisma";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { generateToken } from "../utils/generate-token";
import { verifyToken } from "../utils/verify-token";
import {
  requestPasswordReset,
  resetPasswordWithToken,
} from "../utils/reset-password";

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

    const user = await prismaClient.user.create({
      data: {
        username: username,
        email: email,
        password: hashSync(password, genSaltSync(12)),
      },
    });

    const token = generateToken(username, email);

    res.status(200).json({ user, token });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || authHeaders.split(" ")[1].startsWith("Bearer ")) {
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

    const result = verifyToken(token);
    if (result === null) {
      if (!user) {
        res.status(401).json({ message: "User not found with this email" });
        return;
      }
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
