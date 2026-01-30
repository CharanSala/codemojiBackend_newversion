import Participant from "../models/user.model.js"; // ✅ correct

import bcrypt from "bcrypt";

export const verifyParticipant = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found!" });
    }

    const isMatch = await bcrypt.compare(password, participant.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    if (participant.randomnumber === 0) {
      participant.randomnumber = Math.floor(Math.random() * 5) + 1;
      await participant.save();
    }

    res.json({
      message: "Login successful!",
      email: participant.email,
    });
  } catch (error) {
    console.error("❌ Error verifying participant:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
