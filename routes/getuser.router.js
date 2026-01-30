import { getParticipant } from "../controllers/getuser.controller.js";
import express from "express";

const router = express.Router();
router.get("/getParticipant", getParticipant);
export default router;
