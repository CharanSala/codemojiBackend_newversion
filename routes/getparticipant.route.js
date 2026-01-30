import { getParticipant } from "../controllers/getuser.controller.js";

import express from "express";

const router = express.Router();
router.get("/getParticipantDetails", getParticipant);

export default router;
