import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { otpStore } from "../utils/otpStore.js";
import Participant from "../models/user.model.js";

export const sendotp = async (req, res) => {
  const { email } = req.body;

  const existingUser = await Participant.findOne({ email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email alredy registerd, please Sign in " });
  }

  const otp = otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    specialChars: false,
  });

  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_KEY,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Codemoji OTP Verification",
    text: `Your OTP is ${otp}`,
  });

  res.json({ message: "OTP Sent" });
};
