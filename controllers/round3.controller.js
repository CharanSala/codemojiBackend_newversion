import Participant from "../models/user.model.js";

// 🟢 START / RESUME ROUND 3
export const startRound3 = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const participant = await Participant.findOne({ email });
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // ✅ already started
    if (participant.round3starttime) {
      return res.json({ startTime: participant.round3starttime });
    }

    // 🔥 first time start
    const now = new Date();
    participant.round3starttime = now;
    await participant.save();

    res.json({ startTime: now });
  } catch (error) {
    console.error("Round3 start error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ⏰ AUTO SUBMIT ROUND 3
export const autoSubmitRound3 = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const now = new Date();

    await Participant.findOneAndUpdate(
      { email },
      { round3submissiontime: now },
    );

    res.json({
      success: true,
      submissionTime: now,
      message: "Round 3 auto-submitted",
    });
  } catch (error) {
    console.error("Round3 autosubmit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
