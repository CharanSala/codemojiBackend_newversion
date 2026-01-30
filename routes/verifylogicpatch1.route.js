import verify1 from "../controllers/verifylogicpatch1.controller.js";
import express from "express";

const router = express.Router();

router.post("/verify1", verify1);

export default router;
