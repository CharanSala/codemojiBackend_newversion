import Participant from "../models/user.model.js";

export const updatePoints = async (req, res, hintNum) => {
  try {
    const { email, points } = req.body;

    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res
        .status(404)
        .json({ success: false, message: "Participant not found" });
    }

    // 🔴 Prevent reusing same hint
    if (
      (hintNum === 1 && participant.hint1) ||
      (hintNum === 2 && participant.hint2) ||
      (hintNum === 3 && participant.hint3)
    ) {
      return res.json({
        success: false,
        message: "Hint already used",
      });
    }

    // 🔴 Deduct points
    participant.points = Math.max(0, participant.points - points);

    // 🔴 Unlock correct hint
    if (hintNum === 1) participant.hint1 = true;
    if (hintNum === 2) participant.hint2 = true;
    if (hintNum === 3) participant.hint3 = true;

    await participant.save();

    return res.json({
      success: true,
      points: participant.points,
      hint1: participant.hint1,
      hint2: participant.hint2,
      hint3: participant.hint3,
    });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
