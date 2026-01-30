import Participant from "../models/user.model.js";

export const getParticipant = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found!" });
    }

    res.json({ participant });
  } catch (error) {
    console.error("❌ Error fetching participant:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
