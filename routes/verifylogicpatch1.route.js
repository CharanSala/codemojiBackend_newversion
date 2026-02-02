import verify1 from "../controllers/verifylogicpatch1.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/verify1", authMiddleware, verify1);

export default router;
