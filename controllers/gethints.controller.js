import Participant from "../models/user.model.js";
export const gethints = async (req, res) => {
  const { email } = req.body; // Retrieve email from request body

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const participant = await Participant.findOne({ email: email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    return res.status(200).json({
      hint1: participant.hint1,
      hint2: participant.hint2,
      hint3: participant.hint3,
      points: participant.points,
    });
  } catch (error) {
    console.error("Error fetching hint status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
