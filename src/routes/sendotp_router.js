import express from "express";
import { sendotp } from "../controllers/sendotp_controller.js";
const router = express.Router();

router.post("/sendotp", sendotp);

export default router;
