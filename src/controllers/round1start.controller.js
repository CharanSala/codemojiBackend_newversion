import Participant from "../models/user.model.js";

export const getOrSetRound1StartTime = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // ⏱️ If not started, set start time
    if (!participant.round1starttime) {
      participant.round1starttime = new Date();
      await participant.save();
    }

    return res.status(200).json({
      success: true,
      round1starttime: participant.round1starttime,
    });
  } catch (err) {
    console.error("Round1 start error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
