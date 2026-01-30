import Participant from "../models/user.model.js";

export const getPoints = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await Participant.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user.points);
    res.json({ points: user.points });
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).json({ error: "Server error" });
  }
};
