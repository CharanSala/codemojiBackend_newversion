import { compileCode } from "../controllers/run.controller.js";

import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/compile", authMiddleware, compileCode);

export default router;
