import express from "express";
import { startRound2 } from "../controllers/round2.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

// 🔥 Start / Resume Round 2
router.post("/round2/start", authMiddleware, startRound2);

export default router;
