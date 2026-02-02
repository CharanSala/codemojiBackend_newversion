import { outputverify } from "../controllers/outputverify.controller.js";
import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/outputverify", authMiddleware, outputverify);

export default router;
