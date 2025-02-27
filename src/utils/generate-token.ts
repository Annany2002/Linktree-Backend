import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();
export const secret = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (username: string, email: string) => {
  const token = jwt.sign({ username, email }, secret, {
    expiresIn: "1h",
  });
  return token;
};
