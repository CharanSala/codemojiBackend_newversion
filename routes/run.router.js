import { compileCode } from "../controllers/run.controller.js";

import express from "express";

const router = express.Router();
router.post("/compile", compileCode);

export default router;
