import { verify } from "../controllers/verifylogicpatch2.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/verify", authMiddleware, verify);

export default router;
