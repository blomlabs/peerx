import { NexuHandler } from "nexujs";
import Err from "../config/err";
import jwt from "jsonwebtoken";
import { query } from "../config/neon-client";
import { User } from "../types";

declare module "express-serve-static-core" {
  interface Request {
    user: User;
  }
}

const authorize: NexuHandler = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(
      token,
      String(process.env.JWT_AUTH_SECRET)
    ) as User;

    const user = await query(
      "SELECT email, id, username, address, balance, firstname, lastname FROM users WHERE id = $1",
      [decoded.id]
    );

    if (!user[0]) return res.status(401).json({ error: "Unauthorized" });

    req.user = user[0] as User;

    next();
  } catch (error) {
    const err = new Err(`${(error as Error).message}`, "Error");
    err.statusCode = 500;
    throw err;
  }
};

export default authorize;
