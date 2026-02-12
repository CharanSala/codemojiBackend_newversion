import { otpStore } from "../utils/otpStore.js";

export const verifyotp = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ message: "Verified" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
};
