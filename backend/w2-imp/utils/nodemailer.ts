import nodemailer from "nodemailer";
import Err from "../config/err";

interface Mail {
  to: string;
  html: string;
  subject: string;
}

export const sendMail = async ({ to, html, subject }: Mail) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: html,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    // console.error("❌ Email sending failed:", error);
    const err = new Err("❌ Email sending failed:", "EmailTransportError");
    err.statusCode = 500;
    throw err;
  }
};
