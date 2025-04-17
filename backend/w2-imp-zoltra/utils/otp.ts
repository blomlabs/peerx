import { RequestError as Err } from "zoltra";
import { query } from "../config/neon-client";
import { sendMail } from "./nodemailer";
import { otpTemp } from "../email-temp/otp";
import { generateId } from "./functions";

export const sendOTP = async (email: string, name: string, subject: string) => {
  try {
    const otp = generateId(4);

    const expires_at = new Date(Date.now() + 10 * 60 * 1000);

    await query(
      `
        INSERT INTO otps (email, otp, expires_at) VALUES($1,$2,$3)
        ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = $3
        `,
      [email, otp, expires_at]
    );

    await sendMail({
      to: email,
      subject,
      html: otpTemp(name, otp),
    });
  } catch (error) {
    const err = new Err("Failed to send OTP", "OTP GenerationErr");
    err.statusCode = 500;
    throw err;
  }
};

export const verifyOTP = async (email: string) => {};
