import Participant from "../models/user.model.js";
import axios from "axios";

export const outputverify = async (req, res) => {
  try {
    const { userOutput, output, email } = req.body;

    // 1️⃣ Find participant
    const participant = await Participant.findOne({ email });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found",
      });
    }

    // 2️⃣ Check Output
    if (userOutput.trim() !== output.toString()) {
      return res.json({
        success: false,
        message: "Incorrect output",
      });
    }

    // 3️⃣ Generate submission time (IST)
    const submissionTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());

    participant.round3submissiontime = submissionTime;
    await participant.save();

    // 4️⃣ Send Email via Brevo API (HTTPS - works on Render)
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "CodeMoji",
          email: "salacharan81@gmail.com", // Must be verified in Brevo
        },
        to: [
          {
            email: email,
            name: participant.name,
          },
        ],
        subject: "CodeMoji – Result",
        textContent: `Hi ${participant.name},

Thank you for participating in the CodeMoji event! 🎉

Congratulations on successfully completing all three rounds.

Here are your results:

Logic Patch
Submission Time: ${participant.round1submissiontime}

Emoji Decryption
Submission Time: ${participant.round2submissiontime}

Code Unreveal
Submission Time: ${participant.round3submissiontime}

Final Emojies: ${participant.points}

We truly appreciate your enthusiasm and creativity.

Keep coding 🚀
– Team CodeMoji`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    // 5️⃣ Success Response
    return res.json({
      success: true,
      submissionTime,
      message: "Submitted successfully & mail sent",
    });
  } catch (error) {
    console.error("Error verifying output:", error.response?.data || error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
