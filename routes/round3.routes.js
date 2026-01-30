import express from "express";
import { startRound3 } from "../controllers/round3.controller.js";

const router = express.Router();

router.post("/round3/start", startRound3);

export default router;
