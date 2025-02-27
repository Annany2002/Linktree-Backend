import jwt from "jsonwebtoken";
import { secret } from "./generate-token";

export const verifyToken = (token: string) => {
  try {
    const verfied = jwt.verify(token, secret);
    return verfied;
  } catch (error) {
    return null;
  }
};
