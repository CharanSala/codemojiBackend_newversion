import { getParticipant } from "../controllers/getuser.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.get("/getParticipant", authMiddleware, getParticipant);
export default router;
