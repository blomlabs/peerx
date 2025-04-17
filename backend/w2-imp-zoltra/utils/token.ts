import { sendMail } from "./nodemailer";
import { confirmMailTemp } from "../email-temp/confirm-email";
import { query } from "../config/neon-client";
import { generateUUID } from "./functions";
import { RequestError as Err } from "zoltra";

export const generateToken = async (email: string, name: string) => {
  try {
    const verificationToken = generateUUID();
    // Vercel Live Domain
    // const confirm_url = `https://app.peerx.vercel.app/verify-email?email=${email}&token=${verificationToken};
    // LocalHost
    const confirm_url = `https://localhost:3000/verify-email?email=${email}&token=${verificationToken}`;

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await sendMail({
      to: email,
      subject: "PeerX Awaits You – Confirm Your Email to Dive In",
      html: confirmMailTemp(name, confirm_url),
    });

    await query(
      `INSERT INTO tokens (email, token, expires_at) VALUES($1,$2,$3)
       ON CONFLICT (email) DO UPDATE SET token = $2, expires_at = $3`,
      [email, verificationToken, expiresAt]
    );
  } catch (error) {
    const err = new Err(`${error}`, "TokenGenerationError");
    err.statusCode = 500;
    throw err;
  }
};

export const verifyToken = async (email: string, token: string) => {
  try {
    const result = await query(
      "SELECT * FROM tokens WHERE email = $1 AND token = $2",
      [email, token]
    );

    if (result.length === 0) {
      return { success: false, message: "Invalid Token" };
    }

    const expires_at = result[0].expires_at;

    if (new Date() > new Date(expires_at)) {
      return { success: false, message: "Token has expired" };
    }

    await query("DELETE FROM tokens WHERE email = $1", [email]);

    return { success: true, message: "Token verified successfully" };
  } catch (error) {
    const err = new Err(`${error}`, "TokenVerificationError");
    err.statusCode = 500;
    throw err;
  }
};
