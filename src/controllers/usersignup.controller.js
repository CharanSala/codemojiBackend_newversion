import Participant from "../models/user.model.js"; // ✅ correct
import bcrypt from "bcryptjs";

// POST /api/users/participantsignup
export const signupParticipant = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Participant.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new participant
    const participant = await Participant.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Signup successful",
      email: participant.email,
      name: participant.name,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
};
