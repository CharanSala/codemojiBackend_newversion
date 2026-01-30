import express from "express";
import { getOrSetRound1StartTime } from "../controllers/round1start.controller.js";

const router = express.Router();

router.post("/round1", getOrSetRound1StartTime);

export default router;
