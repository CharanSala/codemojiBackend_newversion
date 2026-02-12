import Participant from "../models/user.model.js";
import nodemailer from "nodemailer";

export const outputverify = async (req, res) => {
  try {
    const { userOutput, output, email } = req.body;

    const participant = await Participant.findOne({ email });

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

      // Save submission time
      participant.round3submissiontime = sub;
      await participant.save();

      // ================= SEND MAIL ==================

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      await transporter.sendMail({
        to: email,
        subject: "CodeMoji – Round 3 Result",
        text: `
Hi ${participant.name},

Thank you for participating in the CodeMoji event! Congratulations on successfully completing all three rounds. Here are your results:

Logic Patch   
Submission Time: ${participant.round1submissiontime}

Emoji Decryption
Submission Time: ${participant.round2submissiontime}

Code Unreveal 
Submission Time: ${participant.round3submissiontime}


Final Emojies : ${participant.points}

We truly appreciate your enthusiasm, creativity, and problem-solving spirit throughout the event. Keep exploring, keep learning, and continue turning challenges into opportunities!

Wishing you great success ahead 🚀  
– Team CodeMoji
  `,
      });

      // ===============================================

      return res.json({
        success: true,
        submissionTime: sub,
        message: "Submitted successfully & mail sent",
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect output",
      });
    }
  } catch (error) {
    console.error("Error verifying output:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
