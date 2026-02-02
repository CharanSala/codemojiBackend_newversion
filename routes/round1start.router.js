import express from "express";
import { getOrSetRound1StartTime } from "../controllers/round1start.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/round1", authMiddleware, getOrSetRound1StartTime);

export default router;
