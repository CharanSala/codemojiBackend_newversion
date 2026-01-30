import express from "express";
import { autoSubmitRound2 } from "../controllers/timeup2.controller.js";

const router = express.Router();

router.post("/round2", autoSubmitRound2);

export default router;
