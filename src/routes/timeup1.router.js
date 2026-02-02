import express from "express";
import { autoSubmitRound1 } from "../controllers/timeup1.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/round1", authMiddleware, autoSubmitRound1);

export default router;
