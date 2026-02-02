import Participant from "../models/user.model.js";

export const outputverify = async (req, res) => {
  try {
    const { userOutput, output, email } = req.body; // Get email from request

    // Find the participant based on email
    const participant = await Participant.findOne({ email: email });

    if (!participant) {
      return res
        .status(404)
        .json({ success: false, message: "Participant not found" });
    }

    if (userOutput.trim() === output.toString()) {
      const sub = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());

      // Store submission time in DB
      participant.round3submissiontime = sub;
      console.log("Charanananananan", sub);
      await participant.save();

      return res.json({ success: true, submissionTime: sub });
    } else {
      return res.json({ success: false, message: "Incorrect output" });
    }
  } catch (error) {
    console.error("Error verifying output:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
