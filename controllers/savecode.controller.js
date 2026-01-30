import Participant from "../models/user.model.js";

export const saveCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const participant = await Participant.findOne({ email: email });

    if (!participant) {
      return res.status(404).send({ message: "Participant not found" });
    }
    participant.submittedCode = code;
    await participant.save();

    res.status(200).json({ message: "Code saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save code" });
  }
};
