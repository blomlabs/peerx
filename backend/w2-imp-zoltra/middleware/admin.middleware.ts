import jwt from "jsonwebtoken";
import { JWT_AUTH_SECRET } from "../config/env";
import { User } from "../types";
import { query } from "../config/neon-client";
import { ZoltraHandler, RequestError as Err } from "zoltra";

const authorizeAdmin: ZoltraHandler = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({ error: "Unauthorized", sucess: false });

    const decoded = jwt.verify(token, String(JWT_AUTH_SECRET)) as User;

    const user = await query(
      "SELECT email, id, username, is_admin from users WHERE id = $1",
      [decoded.id]
    );

    if (!user[0].is_admin) {
      return res
        .status(401)
        .json({ error: "User is not an admin", success: false });
    }

    req.user = user[0] as User;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorizeAdmin;
