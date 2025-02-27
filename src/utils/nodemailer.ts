import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `http://localhost:5000/api/auth/user/reset-password?token=${token}`;

  await transporter.sendMail({
    from: "LinkTree Backend",
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
};
