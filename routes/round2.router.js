import express from "express";
import { startRound2 } from "../controllers/round2.controller.js";

const router = express.Router();

// 🔥 Start / Resume Round 2
router.post("/round2/start", startRound2);

export default router;
