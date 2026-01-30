import Participant from "../models/user.model.js";

export const resetParticipant = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // 🔁 RESET HINTS
    participant.hint1 = false;
    participant.hint2 = false;
    participant.hint3 = false;

    // 🔁 RESET SUBMISSION TIMES
    participant.round1submissiontime = null;
    participant.round2submissiontime = null;
    participant.round3submissiontime = null;

    // 🔁 RESET START TIMES
    participant.round1starttime = null;
    participant.round2starttime = null;
    participant.round3starttime = null;

    // 🔁 RESET CODE DATA
    participant.submittedCode = null;
    participant.language = null;
    participant.output = "";
    participant.points = 0;

    // 🔢 GENERATE RANDOM NUMBER (1–5) BUT NOT SAME AS PREVIOUS
    let newRandom;
    do {
      newRandom = Math.floor(Math.random() * 5) + 1;
    } while (newRandom === participant.randomnumber);

    participant.randomnumber = newRandom;

    // 🔁 RESET VALUES
    participant.value1 = 0;
    participant.value2 = 0;
    participant.value3 = 0;

    await participant.save();

    return res.status(200).json({
      success: true,
      message: "Participant reset successfully",
      randomnumber: newRandom,
    });
  } catch (error) {
    console.error("Reset error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
