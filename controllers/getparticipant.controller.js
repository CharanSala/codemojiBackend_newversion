import Participant from "../models/user.model.js ";

export const getparticipant = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      status: false,
      message: "Email is required",
    });
  }

  try {
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({
        status: false,
        message: "Participant not found",
      });
    }

    return res.status(200).json({
      status: true,
      participant: {
        email: participant.email,
        language: participant.language || "",
        submittedCode: participant.submittedCode || "",
        points: participant.points || 0,
        round1submissiontime: participant.round1submissiontime || "",
      },
    });
  } catch (error) {
    console.error("Get Participant Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};
