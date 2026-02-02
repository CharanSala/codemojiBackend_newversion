import express from "express";
import { verifyParticipant } from "../controllers/user.controller.js"; // ✅ corrected path

const router = express.Router();

// Login / verify
router.post("/participantverify", verifyParticipant); // ✅ leading slash

export default router;
