import { signToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";
import { RequestError, ZoltraHandler } from "zoltra";
import { query } from "../config/neon-client";
//
export const signIn: ZoltraHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExits = await query(
      "SELECT firstname, lastname, email, username, address, balance, transactions, id, email_confirmed, password FROM users WHERE email = $1",
      [email]
    );

    if (userExits.length === 0) {
      const error = new RequestError("User not found", "AuthenticationError");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordMatched = await comparePassword(
      password,
      userExits[0]?.password
    );

    if (!isPasswordMatched) {
      const error = new RequestError("Invalid Password", "InvalidCredentails");
      error.statusCode = 401;
      throw error;
    }

    const token = signToken(userExits[0]);

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    //   next(error);
    const err = error as RequestError;
    return res.status(500).json({
      message: err.name,
      error: err.message,
    });
  }
};
