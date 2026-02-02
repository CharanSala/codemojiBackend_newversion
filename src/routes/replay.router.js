import express from "express";
import { resetParticipant } from "../controllers/replay.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/reset", authMiddleware, resetParticipant);

export default router;
