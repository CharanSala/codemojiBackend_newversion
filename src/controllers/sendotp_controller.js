import otpGenerator from "otp-generator";
import axios from "axios";
import { otpStore } from "../utils/otpStore.js";
import Participant from "../models/user.model.js";

export const sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await Participant.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered, please Sign in",
      });
    }

    // Generate 4-digit OTP
    const otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      specialChars: false,
    });

    otpStore[email] = otp;

    // Send Email via Brevo API
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CodeMoji",
          email: "salacharan81@gmail.com", // must be verified in Brevo
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "Codemoji OTP Verification",
        textContent: `Your OTP is ${otp}`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({ message: "OTP Sent" });
  } catch (error) {
    console.error("OTP send error:", error.response?.data || error);

    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};
