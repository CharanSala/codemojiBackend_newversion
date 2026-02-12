import Participant from "../models/user.model.js";
import axios from "axios";

const sendMail = async (email, subject, text) => {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "CodeMoji",
        email: "salacharan81@gmail.com", // must be verified in Brevo
      },
      to: [
        {
          email: email,
        },
      ],
      subject: subject,
      textContent: text,
    },
    {
      headers: {
        "api-key": process.env.BREVO_KEY,
        "Content-Type": "application/json",
      },
    },
  );
};

export const checkSessions = async () => {
  const now = new Date();
  const users = await Participant.find();

  for (let p of users) {
    // ===== ROUND 1 CHECK =====
    if (p.round1starttime && !p.round2starttime) {
      const r1End = new Date(p.round1starttime).getTime() + 10 * 60 * 1000;

      if (now.getTime() > r1End) {
        await sendMail(
          p.email,
          "Continue Round 2 – CodeMoji",
          `Hi ${p.name},

Your Round 1 time is completed but you haven't started Round 2.

Please login and continue your session.

– Team CodeMoji`,
        );
      }
    }

    // ===== ROUND 2 CHECK =====
    if (p.round2starttime && !p.round3starttime) {
      const r2End = new Date(p.round2starttime).getTime() + 30 * 60 * 1000;

      if (now.getTime() > r2End) {
        await sendMail(
          p.email,
          "Continue Round 3 – CodeMoji",
          `Hi ${p.name},

Your Round 2 time is completed but you haven't started Round 3.

Complete the final round and save your emojis!

– Team CodeMoji`,
        );
      }
    }
  }
};
