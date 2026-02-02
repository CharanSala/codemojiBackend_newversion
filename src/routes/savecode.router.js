import { saveCode } from "../controllers/savecode.controller.js";

import express from "express";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/savecode", authMiddleware, saveCode);

export default router;
