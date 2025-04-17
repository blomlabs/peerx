import jwt from "jsonwebtoken";
import { JWT_AUTH_SECRET } from "../config/env";

export const signToken = <T extends object>(data: T) => {
  const SECRET = JWT_AUTH_SECRET;
  return jwt.sign(data, String(SECRET), { expiresIn: "7d" });
};
