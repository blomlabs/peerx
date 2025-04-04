import jwt from "jsonwebtoken";

export const signToken = <T extends object>(data: T) => {
  const SECRET = process.env.JWT_AUTH_SECRET;
  return jwt.sign(data, String(SECRET), { expiresIn: "7d" });
};
