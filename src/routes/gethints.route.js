import { gethints } from "../controllers/gethints.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/gethints", authMiddleware, gethints);

export default router;
