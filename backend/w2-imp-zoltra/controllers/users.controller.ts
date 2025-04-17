import { neonClient, query } from "../config/neon-client";
import { RequestError as Err, ZoltraHandler } from "zoltra";

export const getUsers: ZoltraHandler = async (req, res, next) => {
  try {
    const users = await neonClient.useQueryLimit({
      req,
      table: "users",
      columns_list:
        "firstname, lastname, email, username, address, balance, transactions, id, email_confirmed, created_at ",
    });

    if (users.length === 0) {
      const error = new Err("No user found", "UserError");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Users successfully fetched",
      length: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser: ZoltraHandler = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await query(
      `
        SELECT firstname, lastname, email, username, address, balance, transactions, id, email_confirmed, created_at
        FROM users
        WHERE username = $1`,
      [username]
    );

    if (user.length === 0) {
      const error = new Err("User not found", "UserNotFound");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User successfully fetched",
      data: user[0],
    });
  } catch (error) {
    next(error);
  }
};
