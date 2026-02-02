import Participant from "../models/user.model.js";

export const autoSubmitRound2 = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // ⏰ IST Time
    const submissionTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());

    // ✅ Save Round 2 time ONLY ONCE
    if (!participant.round1submissiontime) {
      participant.round1submissiontime = submissionTime;
      console.log(participant.round1submissiontime, "Charan");
      await participant.save();
    }

    return res.status(200).json({
      success: true,
      submissionTime,
      message: "Round 2 auto submission saved",
    });
  } catch (error) {
    console.error("Auto submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
