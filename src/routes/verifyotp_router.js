import express from "express";
import { verifyotp } from "../controllers/verifyotp_controller.js";
const router = express.Router();

router.post("/verifyotp", verifyotp);

export default router;
