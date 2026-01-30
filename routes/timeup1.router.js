import express from "express";
import { autoSubmitRound1 } from "../controllers/timeup1.controller.js";

const router = express.Router();

router.post("/round1", autoSubmitRound1);

export default router;
