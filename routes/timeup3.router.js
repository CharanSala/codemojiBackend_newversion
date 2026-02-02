import express from "express";
import { autoSubmitRound3 } from "../controllers/timeup3.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/round3", authMiddleware, autoSubmitRound3);

export default router;
