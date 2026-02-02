import { getPoints } from "../controllers/getpoints.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();
router.get("/getPoints1", authMiddleware, getPoints);

export default router;
