import { gethints } from "../controllers/gethints.controller.js";
import express from "express";

const router = express.Router();
router.post("/gethints", gethints);

export default router;
