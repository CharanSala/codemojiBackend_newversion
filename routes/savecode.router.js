import { saveCode } from "../controllers/savecode.controller.js";

import express from "express";
const router = express.Router();

router.post("/savecode", saveCode);

export default router;
