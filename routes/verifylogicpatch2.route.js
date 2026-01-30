import { verify } from "../controllers/verifylogicpatch2.controller.js";
import express from "express";

const router = express.Router();

router.post("/verify", verify);

export default router;
