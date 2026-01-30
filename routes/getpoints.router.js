import { getPoints } from "../controllers/getpoints.controller.js";
import express from "express";

const router = express.Router();
router.get("/getPoints1", getPoints);

export default router;
