import { generateRandomID, NexuHandler } from "nexujs";
import { query } from "../config/neon-client";
import Err from "../config/err";
import { comparePassword, hashPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { generateToken } from "../utils/token";
import { sendOTP } from "../utils/otp";

export const registerUser: NexuHandler = async (req, res, next) => {
  const { firstname, lastname, email, password, username } = req.body;
  try {
    const userAlreadyExits = await query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userAlreadyExits.length !== 0) {
      const error = new Err("User already exits", "AuthenticationError");
      error.statusCode = 403;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const address = `0x${generateRandomID(46)}`;

    const balances = {
      usdt: 10000,
      btc: 5,
      bnb: 10,
    };

    const newUser = await query(
      `INSERT INTO users (firstname, lastname, email, password, username, address, email_confirmed, balance) VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING firstname, lastname, email, username, address, balance, transactions, id, email_confirmed`,
      [
        firstname,
        lastname,
        email,
        hashedPassword,
        username,
        address,
        false,
        balances,
      ]
    );

    // Email verification token
    await generateToken(newUser[0].email, newUser[0].firstname);

    const token = signToken(newUser[0]);

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    next(error);
  }
};

export const signIn: NexuHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExits = await query(
      "SELECT firstname, lastname, email, username, address, balance, transactions, id, email_confirmed, password FROM users WHERE email = $1",
      [email]
    );

    if (userExits.length === 0) {
      const error = new Err("User not found", "AuthenticationError");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordMatched = await comparePassword(
      password,
      userExits[0]?.password
    );

    if (!isPasswordMatched) {
      const error = new Err("Invalid Password", "InvalidCredentails");
      error.statusCode = 401;
      throw error;
    }

    const token = signToken(userExits[0]);

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword: NexuHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await query(
      "SELECT email, id, firstname FROM users WHERE email = $1",
      [email]
    );

    if (user.length === 0) {
      const error = new Err("Account does not exits", "AccountError");
      error.statusCode = 404;
      throw error;
    }

    await sendOTP(
      email,
      user[0].firstname,
      "Reset Password - OTP Verification"
    );

    res.status(200).json({ success: true, message: "OTP Successfully sent" });
  } catch (error) {
    next(error);
  }
};
