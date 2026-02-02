import express from "express";
import { startRound3 } from "../controllers/round3.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/round3/start", authMiddleware, startRound3);

export default router;
