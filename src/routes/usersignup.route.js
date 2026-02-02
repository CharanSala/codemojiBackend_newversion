import express from "express";
import { signupParticipant } from "../controllers/usersignup.controller.js";

const router = express.Router();

// Signup route
router.post("/participantsignup", signupParticipant);

// (Optional) Add other routes like login later
// router.post("/participantverify", loginParticipant);

export default router;
