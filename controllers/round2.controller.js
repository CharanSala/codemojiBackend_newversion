import Participant from "../models/user.model.js";

// 🔹 START ROUND 2 (get or set start time)
export const startRound2 = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // ✅ If start time already exists
    if (participant.round2starttime) {
      return res.json({
        startTime: participant.round2starttime,
      });
    }

    // 🟢 Else create start time
    const now = new Date();

    participant.round2starttime = now;
    await participant.save();

    res.json({
      startTime: now,
    });
  } catch (error) {
    console.error("Round2 start error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
