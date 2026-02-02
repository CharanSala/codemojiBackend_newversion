import { leaderboard } from "../controllers/leaderboard.controller.js";

import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();
router.get("/leaderboard", authMiddleware, leaderboard);

export default router;
