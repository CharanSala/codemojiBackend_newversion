import express from "express";
import { autoSubmitRound3 } from "../controllers/timeup3.controller.js";

const router = express.Router();

router.post("/round3", autoSubmitRound3);

export default router;
