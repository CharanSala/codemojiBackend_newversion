import express from "express";
import { autoSubmitRound2 } from "../controllers/timeup2.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/round2", authMiddleware, autoSubmitRound2);

export default router;
