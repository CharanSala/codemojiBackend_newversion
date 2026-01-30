import express from "express";
import { resetParticipant } from "../controllers/replay.controller.js";

const router = express.Router();

router.post("/reset", resetParticipant);

export default router;
