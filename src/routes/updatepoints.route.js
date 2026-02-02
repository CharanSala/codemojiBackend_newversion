import express from "express";
import { updatePoints } from "../controllers/updatepoints.controller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

// hint 1 → cost 10
router.post("/updatepoints", (req, res) => updatePoints(req, res, 1));

// hint 2 → cost 20
router.post("/updatepoints1", (req, res) => updatePoints(req, res, 2));

// hint 3 → cost 30
router.post("/updatepoints2", (req, res) => updatePoints(req, res, 3));

export default router;
