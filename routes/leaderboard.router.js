import { leaderboard } from "../controllers/leaderboard.controller.js";

import express from "express";

const router = express.Router();
router.get("/leaderboard", leaderboard);

export default router;
